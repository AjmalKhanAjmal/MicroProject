const db = require('../config/db')
const { DataTypes } = require("sequelize")
const tax_rates = db.define("tax_rate", {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rate: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    tableName: "tax_rates",
    // timeStamp : true
})


module.exports = tax_rates