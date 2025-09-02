const { DataTypes } = require("sequelize")
const db = require("../config/db")
const model = db.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descritpion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    price : {
        type : DataTypes.DECIMAL,
        allowNull : true
    },
    status : {
        type : DataTypes.STRING,
        allowNull : true
    }
}, {
    timeStamp: true
})


module.exports = model