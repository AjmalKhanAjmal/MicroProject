const express = require("express")
const app =  express()
const {route}=  require("./src/routes/order_routes")
require("dotenv").config()
app.use(route)


console.log("hirt 1 ");

app.listen(process.env.SERVER_PORT,()=>{
    console.log("server running on PORT : ",process.env.SERVER_PORT);
    
})