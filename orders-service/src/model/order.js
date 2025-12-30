
const {Sequelize}   = require("sequelize")
const path = require("path");
require('dotenv').config({
    path: path.join(__dirname, "../../.env")
})


// require("dotenv").config({ path: "../../.env" })



const  sqlize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
         logging: false,
        dialect :'mysql',
        host : process.env.DB_HOST,
        post : process.env.DB_PORT
    }
)


let connect =async ()=>{
    try{
        let createConnection = await sqlize.authenticate()
        console.log("db connected");
        
    }catch(error){
        console.log("error during conecting", error.message);
    }

}

connect()



module.exports = {sqlize}




// const { Sequelize } = require("sequelize");
// const path = require("path");

// require("dotenv").config({
//   path: path.join(process.cwd(), ".env")
// });

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_PORT);

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: "mysql",
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     logging: false
//   }
// );

// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ DB connected");
//   } catch (error) {
//     console.error("❌ DB connection error:", error.message);
//   }
// };

// connect();
