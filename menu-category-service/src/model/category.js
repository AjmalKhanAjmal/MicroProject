const sqlize = require("../config/db")
const { DataTypes } = require("sequelize")
const Category = sqlize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    store_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    timestamps: true
})

console.log("created category table");

module.exports = Category