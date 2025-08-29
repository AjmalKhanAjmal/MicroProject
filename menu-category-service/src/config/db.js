const sequelize = require("sequelize")
require("dotenv").config()

const sqlize = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        logging: false,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)




//approach 1 

const connect = async () => {
    try {
        await sqlize.authenticate()
        console.log("DB conneced successfully");
    }
    catch (error) {
        console.log("DB connection  failed ");
    }
}

connect()


//approach 2

// // Promise handling
// let results = new Promise((resolve, reject) => {
//     sequelize.authenticate()  // Try to authenticate the connection
//         .then(() => {
//             resolve("DB connected successfully");  // If authentication is successful
//         })
//         .catch((error) => {
//             reject({
//                 status: "error",
//                 message: error.message  // If an error occurs, reject with error message
//             });
//         });
// });

// // Handling the promise
// results
//     .then((message) => {
//         console.log(message);  // Logs success message
//     })
//     .catch((error) => {
//         console.error(error);  // Logs error message
//     });



//approach 3

// new Promise((resolve, reject) => {
//     sqlize.authenticate()  // Try to authenticate the connection
//         .then(() => {
//             resolve(
//                 console.log("DB connected successfully")
//             );  // If authentication is successful
//         })
//         .catch((error) => {
//             let errorr = {
//                 status: "error",
//                 message: error.message  // If an error occurs, reject with error message
//             }
//             reject(
//                 console.log(errorr)

//             );
//         });
// });


module.exports = sqlize