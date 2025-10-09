const product_controller = require("../controllers/product_controller")
const express =  require("express")
const routes = express.Router()

console.log("log  --  1 ");

routes.post("/api/product",product_controller.saveProduct)
routes.post("/api/product/list",product_controller.fetchProducts)
routes.delete("/api/product/:id",product_controller.removeProduct)


module.exports = {routes}