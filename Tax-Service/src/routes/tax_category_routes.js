const express = require("express")
const routes = express.Router()
const tax_category_controller =require("../controller/tax_category_controller")
routes.post("/api/tax_category",tax_category_controller.insertTaxCategory)
routes.put("/api/tax_category/:id",tax_category_controller.editTaxCategory)
routes.get("/api/tax_category", tax_category_controller.getAllTaxCategory)
routes.get("/api/tax_category/:id",tax_category_controller.getTaxCategById)
module.exports = routes