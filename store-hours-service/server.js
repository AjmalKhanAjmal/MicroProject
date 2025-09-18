const express = require("express")
const app = express()

require("dotenv").config()
const db = require("./src/config/db")
const Store_hours = require("./src/model/store_hours")
const Store_hours_options = require("./src/model/store_hours_options")
const routes = require("./src/routes/store_hour_routes")

app.use(express.json())
app.use(routes)
app.listen(process.env.SERVER_PORT, () => {
    console.log("store - hours running on PORT : ", process.env.SERVER_PORT);
})

db.sync({ alter: true }).then(() => {
    console.log(" table synchronizeed");
    app.listen(process.env.SERVER_PORT, () => {
        console.log(" running on port : ", process.env.SERVER_PORT);
    })
})
    .catch((error) => {
        console.log("error : ", error.message);

    })
