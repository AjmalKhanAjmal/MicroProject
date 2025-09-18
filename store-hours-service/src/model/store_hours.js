const db = require("../config/db")
const { DataTypes } = require("sequelize")
// --> store hours
//     |-- name
//     |-- time_zone
//     |-- is_special_hour_enabled // not used in real time 
//     |-- special_hour_data : [], // not used in real time 


const Store_hours = db.define("store_hour", {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time_zone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "store_hours",
    timestamps: true
}

)

// console.log("store hours table created");



module.exports = Store_hours

