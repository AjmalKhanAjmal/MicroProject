const db = require("../config/db")
const { DataTypes }  = require("sequelize")

const tax_category = db.define("tax_category",{
    name :{
        type: DataTypes.STRING,
        allowNull : true
    },
    description :{
        type: DataTypes.STRING,
        allowNull : true
    }
},{
    tableName : "tax_categories",
    // timeStamp : true
})



module.exports = tax_category

// tax_categories

// id	
// name	
// description	
// created_at	
// updated_at	


// ta_rates


// id	
// tax_category_id
// rate	
// created_at
// updated_at