const express = require("express")
const routes = express.Router()
const store_hours_controller = require("../controllers/store_hours_controller")

routes.post("/api/store_hours",store_hours_controller.insertStoreHours)

console.log("request routes");

routes.get("/api/store_hours",store_hours_controller.fetchStoreHours)


module.exports= routes