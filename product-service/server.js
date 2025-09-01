const express = require("express")
const app = express()
require('dotenv').config()
const db = require("./src/config/db")


app.listen(process.env.SERVER_PORT,()=>{
    console.log(" running on port : ", process.env.SERVER_PORT);
})