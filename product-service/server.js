const express = require("express")
const app = express()
require('dotenv').config()
const Redis = require("ioredis")
const db = require("./src/config/db")
// const product = require("./src/model/product_modal")
const redisClient = new Redis(process.env.REDIS_URL)
app.use(express.json())
const routes = require("./src/routes/product_routes")



app.use("/api/products", (req, res, next) => {
    req.redisClient = redisClient
    next()
}, routes)


console.log("routes -- 2 ");
db.sync({ alter: true }).then(() => {
    console.log(" table synchronizeed");
    app.listen(process.env.SERVER_PORT, () => {
        console.log(" running on port : ", process.env.SERVER_PORT);
    })
})
    .catch((error) => {
        console.log("error : ", error.message);

    })


