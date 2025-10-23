const express = require("express")
const routes = express.Router()
// const {authenticateRequest} = require("../middleWares/authMiddleware")

const product_controller = require("../controllers/product_controller")
const upload = require("../middleWares/uploads");


// routes.post("/product/saveproduct",authenticateRequest,product_controller.saveProduct)
routes.post("/product/saveproduct",product_controller.saveProduct)

routes.get("/product/:id",product_controller.productById)
routes.get("/products",product_controller.getProductS)
routes.delete("/product/:id",product_controller.removeProduct)
// routes.post("/product/upload",product_controller.uploadFileProducts)

// CSV upload route
routes.post("/product/upload", upload.single("file"), product_controller.uploadFileProducts);

module.exports = routes
