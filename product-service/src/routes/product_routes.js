const express = require("express")
const routes = express.Router()
const {authenticateRequest} = require("../middleWares/authMiddleware")

const product_controller = require("../controllers/product_controller")


routes.post("/product/saveproduct",authenticateRequest,product_controller.saveProduct)
routes.get("/product/:id",product_controller.productById)
routes.get("/products",product_controller.getProductS)
routes.delete("/product/:id",product_controller.removeProduct)
module.exports = routes
