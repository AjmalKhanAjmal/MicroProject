const { error, log } = require("console");
const { mongoose } = require("mongoose")

const path = require("path");
require('dotenv').config({
    path: path.join(__dirname, "../../.env")
})


let driver_mongo_url = `${process.env.MONGO_HOST_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`

const connectMongo = () => {
    // mongoose.connect(driver_mongo_url).then(() => {
    //     console.log("connected to db");

    //     return mongoose.connection
    // }).catch((error) =>
    //     console.log("error : ", error.message)
    // )
    return new Promise((resolve, reject) => {
        mongoose.connect(driver_mongo_url).then(function () {
            console.log("db connected succefully ")
            resolve(mongoose.connection)
        }).catch((error) => {
            reject(console.log("error -- : ", error.message)
            )
        })
    })
}

module.exports = { connectMongo }