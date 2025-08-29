const express = require("express")
const app = express()
require("dotenv").config()
const routes = require("./src/routes/menu_category_routes")
app.use(express.json())
app.use("/api", routes)
const port = process.env.SERVER_PORT
const category = require("./src/model/category")
const sqlize = require("./src/config/db")
const menu_organizer = require("./src/model/menu_organizer")



try{
    sqlize.sync({ force: false, alter: true }).then(() => {
    console.log("Database Synchronized");
    
    app.listen(port, () => {
        console.log("listening server on port ", port);
    })

})
}catch(error){
    console.log(error.message);
}
