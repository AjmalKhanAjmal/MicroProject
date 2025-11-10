const express = require("express")
const app = express()
require("dotenv").config()
const  {routes} = require("./routes/product_routes")
const dbConnection = require("./config/db")
const {errorHandler} = require("./middlewares/errorHandler")
const cors = require('cors')
// Allow your frontend origin
app.use(cors({
  origin: "http://localhost:5173", // your Vite dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(routes)

app.use(errorHandler)
app.listen(process.env.SERVER_PORT,()=>{
    console.log("Offline-product-server-starting at : ", process.env.SERVER_PORT);
})
