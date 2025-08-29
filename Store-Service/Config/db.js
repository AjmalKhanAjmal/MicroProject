const Sequelize = require("sequelize")



require('dotenv').config();
const sqlize = new Sequelize(process.env.DB_NAME,         // Database name
    process.env.DB_USER,         // MySQL username
    process.env.DB_PASSWORD, {
    dialect: 'mysql',
    logging: false
})

const connectDb = async () => {
    try {
        await sqlize.authenticate()
        console.log('Connection to the database has been established successfully.');
console.log('Connection to the database has been established successfully.');
console.log('Server is now running...');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        console.log("erorrrrr.....");
        
       // process.exit(1); // Exit on failure
    }

}


module.exports = {connectDb,sqlize}



































// // config/db.js
// const { Sequelize } = require('sequelize');

// // Set up the Sequelize instance for MySQL
// const sequelize = new Sequelize(process.env.DB_URI, {
//     dialect: 'mysql', // Change to 'mysql' for MySQL
//     logging: false, // Disable logging queries
// });

// const connectDB = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection to the database has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         process.exit(1); // Exit on failure
//     }
// };

// module.exports = { sequelize, connectDB };
