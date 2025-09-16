const Tax_category = require("../model/tax_category")
const db = require("../config/db")
const createTaxCategory = async (name, description) => {
   try {
      let results = await Tax_category.create({
         name, description
      })
      return results
   } catch (error) {
      throw new Error(error.message)
   }

}


const updateTaxCategory = async (id, name, description) => {
   try {
      const results = await Tax_category.update({
         name, description
      }, {
         where: {
            id: id
         }
      })
      if(results[0] == 0){
         return null
      }
      return {
         status: "success",
         message: "Tax category updated successfully"
      }
   } catch (error) {
   }
}


const getTaxCategory = async (limit, offset, sort, sort_type, search) => {
   try {
      let tax_limit = limit || 15
      let tax_offset = offset | 0
      let tax_sort = sort || 'updatedAt'
      let tax_sort_type = sort_type || 'asc'
      let tax_search = search

      let get_query = `SELECT * FROM shop.tax_categories order by ${tax_sort} ${tax_sort_type} limit ${tax_limit} offset ${tax_offset} `
      let total_count = `SELECT COUNT(*) AS total_count FROM shop.tax_categories`
      let results = await db.query(get_query)
      let total_count_results = await db.query(total_count)
    
      return {
         status : "success",
         pagination: {
            total_count: total_count_results[0][0].total_count
         },
         data: results[0]
      }

   } catch (error) {
      throw new Error(error.message)
   }
}



const getTaxCategoryById  = async(id) => {
   try{
      let results = await Tax_category.findOne({where : {
         id : id
      }})
      console.log("results : ",results);
      
      return results

   }catch(error){
      throw new Error(error.message)
   }
}

module.exports = { createTaxCategory, updateTaxCategory, getTaxCategory,getTaxCategoryById }