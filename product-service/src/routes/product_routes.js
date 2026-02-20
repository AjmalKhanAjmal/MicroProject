const express = require("express")
const routes = express.Router()
// const {authenticateRequest} = require("../middleWares/authMiddleware")

const product_controller = require("../controllers/product_controller")
const upload = require("../middleWares/uploads");
const temporay_uploads = require("../middleWares/temporaryUploads");

// routes.post("/product/saveproduct",authenticateRequest,product_controller.saveProduct)
routes.post("/product/saveproduct",product_controller.saveProduct)

routes.get("/product/:id",product_controller.productById)
routes.get("/products",product_controller.getProductS)
routes.delete("/product/:id",product_controller.removeProduct)
// routes.post("/product/upload",product_controller.uploadFileProducts)

// CSV upload route
routes.post("/product/upload", upload.single("file"), product_controller.uploadFileProducts);

routes.post("/upload/product",temporay_uploads.single("file"),product_controller.productUploadController)

routes.post("/product/stream/upload",upload.single("file"),product_controller.productStream)

module.exports = routes


// curl --location 'http://localhost:3003/api/products/product/stream/upload' \
// --form 'file=@"/C:/Users/Aziz/Downloads/Book11.xlsx"'