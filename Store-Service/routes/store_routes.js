const storeController = require("../Controllers/StoreCrud")
const express = require("express")
const routes = express.Router()

routes.post("/store", storeController.insertStore)
routes.get("/stores",storeController.stores)
routes.post("/storeinfo/:storeName",storeController.postStoreDataInRedis)
routes.post("/store/details",storeController.fetchDataFromRedis)

module.exports=routes
