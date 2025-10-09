const express = require("express")
const app = express()
require("dotenv").config()
const  {routes} = require("./routes/product_routes")
const dbConnection = require("./config/db")
const {errorHandler} = require("./middlewares/errorHandler")
app.use(express.json());
app.use(routes)


app.use(errorHandler)
app.listen(process.env.SERVER_PORT,()=>{
    console.log("Offline-product-server-starting at : ", process.env.SERVER_PORT);
})
