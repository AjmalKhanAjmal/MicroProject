const express = require("express")
const routes = express.Router()
const menu_category_controller = require("../controllers/offline_menu_organizer_controllers")
const { authenticateRequest } = require("../middleware/authMiddleware")
routes.use(authenticateRequest)
routes.post("/api/menu_category", menu_category_controller.saveMenuOrganizer)
routes.put("/api/menu_category", menu_category_controller.edit_menu_organizer)
routes.get("/api/menu_category", menu_category_controller.fetchMenuOrganizer)
routes.delete("/api/menu_category/:id", menu_category_controller.removeMenuOrganizer)

module.exports = { routes }