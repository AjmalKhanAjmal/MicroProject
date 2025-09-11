const express = require("express")
const routes = express.Router()
const tax_rate_controller = require("../controller/tax_rates_controller")
routes.post("/api/tax_rates",tax_rate_controller.insertTaxRates)
routes.get("/api/tax_rates",tax_rate_controller.fetchTaxRates)


module.exports = routes