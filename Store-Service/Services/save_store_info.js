const { client } = require("../Config/redis")

const axios = require("axios")

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3006',
        timeout: 5000,
        headers: {}
    }
)

async function saveStoreInfoRedis(key_name, value) {
    try {
        // const key_name = key;
        // const data_value = JSON.stringify(value);
        // let results = await client.set(key_name, data_value)
        // return { message: "Data stored in Redis successfully", key_name, value: JSON.parse(data_value) };


        let response = await apiClient.post(`/cache/${key_name}`,value)
        return response
    } catch (error) {
        throw error
    }
}
// app.post("/cache/:storeName", async (req, res) => {

// })

async function getDataFromRedis(storeName) {
    try {
        // const key_name = key;
        // // const data_value = JSON.stringify(value);
        // let results = await client.get(key_name)
        // return { data: JSON.parse(results) };    
        let response = await apiClient.get(`/redis/data/${storeName}`)

        return response

    } catch (error) {
        throw error
        // return res.status(500).json({ message: "Error storing data in Redis", error: error.message });
    }
}



module.exports = { saveStoreInfoRedis, getDataFromRedis }