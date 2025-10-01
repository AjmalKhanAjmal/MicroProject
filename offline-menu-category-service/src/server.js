const express = require("express")
const app = express()
require("dotenv").config()

const {routes} = require("../src/routes/offline_menu_organizer_routes")
const mongodb = require("./config/db")
app.use(express.json());

app.use(routes)



app.listen(process.env.SERVER_PORT,()=>{

    console.log("Server connected at ",process.env.SERVER_PORT );
})