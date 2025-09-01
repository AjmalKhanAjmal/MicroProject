const Sequelize = require("sequelize")
require('dotenv').config()

console.log("error - 1 ");


const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        post: process.env.DB_PORT,
        logging: false,
    }
)
console.log("error - 2 ");

async function connect(){
    try{
        await db.authenticate()
        console.log("db connected Successfully ");
    }
    catch (error){
        console.log(error.message);
    }
}

connect()


module.exports = db