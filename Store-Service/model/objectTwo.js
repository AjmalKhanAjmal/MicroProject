const { DataTypes } = require('sequelize')
const { sqlize} = require("../Config/db")

console.log("execution came ObjectTwo models");

const ObjectTwo = sqlize.define('ObjectTwo', {
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
        tableName: 'ObjectTwo', // Explicitly specify the table name (lowercase plural form)
    }
)


console.log("Created ObjectTwo Store ");


module.export = ObjectTwo




























