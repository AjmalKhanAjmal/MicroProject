const product_controller = require("../controllers/product_controller")
const express =  require("express")
const routes = express.Router()

console.log("log  --  1 ");

routes.post("/api/product",product_controller.saveProduct)
routes.post("/api/product/list",product_controller.fetchProducts)
routes.delete("/api/product/:id",product_controller.removeProduct)
routes.get("/api/product/search/:name",product_controller.fetchIndexProducts)
// fetchProductById
routes.get("/api/product/:id",product_controller.fetchProductById)

module.exports = {routes}



// curl --location 'http://localhost:3010/api/product' \
// --header 'Content-Type: application/json' \
// --data '{
//     "name": "Mutton Biryani",
//     "category_id": 100,
//     "price": "30",
//     "status": "active",
//     "store_id": 1,
//     "service_type": [
//         "pickup",
//         "delivery"
//     ],
//     "application_id": 5454,
//     "product_id":5,
//     "variant_id":1,
//     "tax_category_id":1
// }'