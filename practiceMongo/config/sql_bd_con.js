const { Sequelize } = require('sequelize')
require("dotenv").config({ path: '../.env' })

console.log(" process.env.DB_NAME : ", process.env.DB_NAME);

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false
});

(async () => {
    try {
        await db.authenticate()
        console.log("connected ");
        await db.sync(); // use { alter: true } in dev  

        //sequelize.sync() is dangerous in production because it can silently change or drop database schema, leading to data loss and downtime.
    } catch (error) {
        console.log(error.message);
        
    }
})()

// (async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync(); // use { alter: true } in dev
//     console.log("Database connected");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Unable to start server:", error);
//   }
// })();

module.exports = { db }