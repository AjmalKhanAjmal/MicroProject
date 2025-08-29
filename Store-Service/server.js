const express = require("express")
const app = express()

const Store = require("./model/Store")
const ObjectOne = require("./model/objectOne")
const { client } = require("./Config/redis")
const { connectDb, sqlize } = require("./Config/db")

const redis = require('redis');

const port = 3000

app.use(express.json())




// const client = redis.createClient()
// client.on('error', (err) => console.error('Redis error:', err));
// client.connect()



// const client = redis.createClient({
//      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
// })

app.post("/cache/:storeName", async (req, res) => {
    try {
        const key = req.params.storeName;
        const value = JSON.stringify(req.body);
        await client.set(key, value)
        return res.status(200).json({ message: "Data stored in Redis successfully", key, value });
    } catch (error) {
        console.error("Error storing data in Redis:", error);
        return res.status(500).json({ message: "Error storing data in Redis", error: error.message });
    }
})





app.post("/store/details", async (req, res) => {
    try {
        const store_name = req.body.store_name;
        console.log("Fetching details for store:", store_name);

        let results = await client.get(store_name);
        
        if (results) {
            return res.status(200).json({ "data": JSON.parse(results) });
        } else {
            // If no data found, return a 404 with a message
            return res.status(404).json({ "message": "Store not found in Redis" });
        }
    } catch (error) {
        console.error("Error fetching store details:", error);
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }
});










//const {  createStore, updateStore, getStoreById,getAllStores } = require("./Controllers/StoreCrud")
const { createStore, updateStore, getStoreById, getAllStores } = require("./Services/storeCrud")

const { insertStore, stores } = require("./Controllers/StoreCrud")
//const updateStore = require("./Controllers/StoreCrud")



console.log("Create Store  ----");

app.get("/store/:id", getStoreById)
app.post("/createStore", createStore)


app.post("/updateStore", updateStore)

app.get("/Sstores", getAllStores)


app.post("/insertStore", insertStore)
app.get("/stores", stores)
//connectDb()
app.post("/create", (req, res) => {
    try {
        if (req) {
            let req_payload = ""
            if (req.body) {
                req_payload = req.body
                if (!req_payload.name || !req_payload.price) {
                    return res.status(400).json({ "message": "name or price empty" })
                }
            } else {
                return res.status(400).json({ "message": "no payload received" })
            }
            let { name, price } = req_payload

            return res.status(200).json(req_payload)
        }
    } catch (error) {
        return res.status(500).json({
            "message": "error",
            "error": error
        })
    }

})

sqlize.sync({
    force: false, alter: true
}).then(() => {
    console.log("Database Synchronized");
}).catch((error) => {
    console.log("error while syncing ", error);
})


console.log("Synchronization completd ");


//ObjectTwo 
const ObjectTwo = require("./model/objectTwo")
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})





// // Sync database (only create tables if they don't exist)
// sequelize.sync({ force: false, alter: true }).then(() => {
//     console.log('Database synchronized');
// }).catch((error) => {
//     console.error('Error syncing database:', error);
// });