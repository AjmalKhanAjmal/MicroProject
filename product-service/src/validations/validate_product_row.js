// const {errorHandler} = require("../middleWares/errorHandler")
module.exports.validateProductRow = (row) => {
    let errors = {}
  
    
    try {
    
        if(!row.name) {
            errors.name = "Product name is required"
        }
        if(!row.price) {
            errors.price = "Product price is required"
        }
        if(!row.category_id) {
            errors.category_id = "Product category_id is required"
        }
      
        
     return errors
    } catch (error) {
        
        // console.log(error);
        
        next(error)
    }
}