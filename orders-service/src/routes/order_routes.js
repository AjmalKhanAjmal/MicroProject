const {orderController}= require("../controllers/order_controller")
const express  = require("express")


const route = express.Router()

route.post("/api/order",orderController)
module.exports = {route}
