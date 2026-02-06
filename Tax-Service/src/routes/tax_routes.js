const express = require("express")
const routes = express.Router()
const tax_rate_controller = require("../controller/tax_rates_controller")
routes.post("/api/tax_rates",tax_rate_controller.insertTaxRates)
routes.get("/api/tax_rates",tax_rate_controller.fetchTaxRates)
routes.get("/api/tax_rates/:id",tax_rate_controller.taxByid)
routes.delete("/api/tax_rates/:id",tax_rate_controller.removeTaxRates)
routes.put("/api/tax_rates/:id",tax_rate_controller.editTaxRates)
module.exports = routes




//craete tax rates 

// curl --location 'http://localhost:3004/api/tax_rates' \
// --header 'Content-Type: application/json' \
// --data '{
//     "name": "state tax",
//     "description": "state tax",
//     "tax_category_id": 2,
//     "rate": 20
// }'