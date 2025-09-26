const express = require("express")
const app = express()

const routes = require("./src/routes/redis_routes")

app.use(express.json())
require("dotenv").config()
app.use(routes)
let port = process.env.SERVER_PORT
app.listen(port,()=>{
    console.log("Running at port number ," + port);

})