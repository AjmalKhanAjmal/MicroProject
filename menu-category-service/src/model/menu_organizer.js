const { sequelize, DataTypes } = require("sequelize")
const db = require("../config/db")

    
const Menu_organizer = db.define("menuOrganizer", {
    name: {
        type: DataTypes.STRING,
         allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category_ids: {
        type: DataTypes.JSON,
         allowNull: true
    },
    store_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    timestamps : true
})


module.exports = Menu_organizer