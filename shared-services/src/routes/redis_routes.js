const storeController = require("../controllers/redis_controller")
const express = require("express")
const routes = express.Router()

routes.post("/cache/:key_name",storeController.postDataInRedis)
routes.get("/redis/data/:keyName",storeController.fetchDataFromRedis)
routes.delete("/redis/data/:keyName",storeController.deleteDataFromRedis)


module.exports = routes