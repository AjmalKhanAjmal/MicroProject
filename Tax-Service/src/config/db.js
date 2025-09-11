const sequelize = require("sequelize")
require("dotenv").config()
const db = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        post: process.env.DB_PORT,
         //logging: false,
    }
)

db.authenticate().then(() => {
    console.log("db connected ");
})
    .catch((error) => {
        console.log(error.message);
    })

module.exports = db
