const { Sequelize, Model } = require("sequelize")

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_HOST,
        dialect: "mysql"
    }
)

async function connect() {
    try {
        await db.authenticate()
        console.log("db connected Successfully ");
    }
    catch (error) {
        console.log("error : ", error.message);
    }
}

connect()



module.exports = db
