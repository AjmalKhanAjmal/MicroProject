const db = require("../config/db")
const { DataTypes } = require("sequelize")

// --> store_hours_options
//     |-- store_hour_id
//     |-- day_of_week
//     |-- start_time
//     |-- end_time
//     |-- is_closed
//     |-- is_special_hour
//     |-- special_hour_data
//     |-- label
//     |-- json_data


            // "store_hour_id": 3893699210784093,
            // "day_of_week": 7,
            // "start_time": null,
            // "end_time": null,
            // "is_closed": true,
            // "is_special_hour": true,
            // "special_hour_data": null,
            // "label": "Sun",
            // "json_data": [
            //     {
            //         "start_time": "09:00:00",
            //         "end_time": "17:00:00",
            //         "is_closed": false
            //     }
            // ]

const Store_hours_options = db.define("store_hours_option", {
    store_hour_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    day_of_week: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    is_closed: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    is_special_hour: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    special_hour_data: {
        type: DataTypes.JSON,
        allowNull: true
    },
    label: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    json_data: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: "store_hours_options",
    timestamps: true
}

)

// console.log("store hours options table created");



module.exports = Store_hours_options

