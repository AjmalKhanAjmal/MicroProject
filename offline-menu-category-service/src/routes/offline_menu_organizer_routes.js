const express = require("express")
const routes = express.Router()
const menu_category_controller = require("../controllers/offline_menu_organizer_controllers")
routes.post("/api/menu_category",menu_category_controller.saveMenuOrganizer)
routes.put("/api/menu_category",menu_category_controller.edit_menu_organizer)
routes.get("/api/menu_category",menu_category_controller.fetchMenuOrganizer)
module.exports = {routes}