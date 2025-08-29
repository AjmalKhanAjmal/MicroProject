const { DataTypes } = require('sequelize')
const { sqlize} = require("../Config/db")

console.log("execution came ObjectOne models");

const ObjectOne = sqlize.define('ObjectOne', {
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
        tableName: 'ObjectOne', // Explicitly specify the table name (lowercase plural form)
    }
)


console.log("Created ObjectOne Store ");


module.export = ObjectOne




























