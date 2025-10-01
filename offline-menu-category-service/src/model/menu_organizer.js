const mongoose = require("mongoose")

let menu_organizer_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    category_ids: {
        type: [mongoose.Schema.Types.Mixed],
        required: false
    },
    store_id: {
        type: String,
        required: false,
        get: (v) => BigInt(v),  // Convert back to BigInt when retrieved
        set: (v) => v.toString()  // Convert BigInt to String when saving
    }

}, {
    timestamps: true
})


const Menu_organizer = mongoose.model("menu_organizers", menu_organizer_schema)

module.exports = { Menu_organizer }














// const { sequelize, DataTypes } = require("sequelize")
// const db = require("../config/db")


// const Menu_organizer = db.define("menuOrganizer", {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     category_ids: {
//         type: DataTypes.JSON,
//         allowNull: true
//     },
//     store_id: {
//         type: DataTypes.BIGINT,
//         allowNull: true
//     }
// }, {
//     timestamps: true
// })


// module.exports = Menu_organizer