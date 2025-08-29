const { DataTypes } = require('sequelize')
const { sqlize} = require("../Config/db")

console.log("execution came models");

const store = sqlize.define('Store', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        tableName: 'stores', // Explicitly specify the table name (lowercase plural form)
    }
)


console.log("Created models Store ");


module.exports = store




























// // models/User.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const User = sequelize.define('User', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// }, {
//     tableName: 'users', // Explicitly specify the table name (lowercase plural form)
// });

// module.exports = User;
