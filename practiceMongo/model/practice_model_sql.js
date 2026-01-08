const { db } = require('../config/sql_bd_con')
const { DataTypes } = require("sequelize")

    
const practice_table_schema = db.define('practice_table', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
        //     autoIncrement: true,
        //   primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        // unique: true,
        // validate: {
        //     isEmail: true,
        // },

    },
    products: {
        type: DataTypes.JSON, //array or json
        allowNull: true
    },
    json_data: {
        type: DataTypes.JSON,//array or json
        allowNull: true
    }
})


module.exports = {practice_table_schema}