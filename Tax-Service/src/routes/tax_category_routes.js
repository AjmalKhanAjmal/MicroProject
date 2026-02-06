const express = require("express")
const routes = express.Router()
const tax_category_controller =require("../controller/tax_category_controller")
routes.post("/api/tax_category",tax_category_controller.insertTaxCategory)
routes.put("/api/tax_category/:id",tax_category_controller.editTaxCategory)
routes.get("/api/tax_category", tax_category_controller.getAllTaxCategory)
routes.get("/api/tax_category/:id",tax_category_controller.getTaxCategById)
routes.post("/api/tax/tax_categories",tax_category_controller.getTaxAndTaxCategoryDetails)

module.exports = routes

// create payload : 
// {
//     "name": "state tax",
//     "description": "state tax",
//     "tax_category_id": 2,
//     "rate": 20
// }



// curl --location 'http://localhost:3004/api/tax/tax_categories' \
// --header 'Content-Type: application/json' \
// --data '{
//   "tax_category_ids":[1,2,3,34,233]
// }'