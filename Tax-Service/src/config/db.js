require("dotenv").config({
  path: "C:/MicroSe/Tax-Service/.env"
});

    const sequelize = require("sequelize")
    // require("dotenv").config()

    console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT
});
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
