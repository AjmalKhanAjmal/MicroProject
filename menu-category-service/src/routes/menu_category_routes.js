const express = require("express")
const routes = express.Router()
const category = require("../controllers/category_controller")
const menu = require("../controllers/menu_controller")

routes.post("/category",category.saveCategory)
routes.get("/categories",category.getCategories)
routes.put("/category",category.editCategory)
routes.get("/category/:id",category.getCategoryById)
routes.delete("/category/:id",category.removeCategory)


routes.post("/menu",menu.saveMenu)
routes.get("/menu",menu.getMenu)
routes.put("/menu",menu.editMenu)
routes.get("/menu/:id", menu.menuById)
routes.delete("/menu/:id",menu.destroyMenu)
module.exports = routes




