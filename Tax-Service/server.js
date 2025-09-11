const express = require("express")
const app =express()
require("dotenv").config()
const db = require("./src/config/db")

const tax_categories = require("./src/model/tax_category")
const tax_rates = require("./src/model/tax_rates")

const routes = require("./src/routes/tax_routes")
app.use(express.json())
app.use("",routes)


db.sync({alter: true }).then(()=>{
    console.log("tables created Success fully");
}).catch((error)=>{
    console.log(error.message);
    
})
app.listen(process.env.SERVER_PORT,()=>{
    console.log("running on port : ",process.env.SERVER_PORT);
})