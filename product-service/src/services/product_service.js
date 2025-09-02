const Product = require("../model/product_modal")
const db = require("../config/db")
const createProduct = async (req) => {
  //  console.log("rom service");

  console.log("Product Service stareedd..");

  if (req) {
    try {
      const { name, price, description, status, category_id } = req

      if (!name || !price) {
        return { error: "Name and Price are required" };
      }

      const product = await Product.create({ name, price, description, status, category_id });
      return product

    } catch (error) {
      return { error: error.message };
    }
  }

}

const getProductById = async (id) => {
  try {


    if (id) {
      results = await Product.findOne({
        where: {
          id: id
        }
      })
      console.log("results :; ");

      console.log(results);

      if (!results) {
        return null
      }
      return results
    }
  }
  catch (error) {
    throw new Error(error.message)
  }
}

const getAllProducts = async (limit, offset, sort, sort_type, store_id) => {
  try {
       
    let product_limit = parseInt(limit) || 15
    let product_offset = parseInt(offset) || 0
    let product_sort = sort || "createdAt"
    let product_sort_type = sort_type || "asc"

    
    
    let get_query = `SELECT name,descritpion,price,category_id,updatedAt,createdAt FROM shop.products order by ${product_sort} ${product_sort_type} limit ? offset ?`
    let total_count_query = `SELECT count(*) as total_count FROM shop.products`
    console.log("errror  : 2 ");
    let results = await db.query(get_query, {
      replacements: [product_limit, product_offset]
    }
    )


    let total_count_results = await db.query(total_count_query)
    return {
      status : "success",
      data : results[0],
      pagination : {
        total_count :total_count_results[0][0].total_count,
      },
    }
  } catch (error) {
    throw new Error(error.message)
  }
}


const deleteProductById = async (id)=>{
  try{
    if(id){
    let results = await Product.destroy({
      where:{
        id : id
      }
    })
   if(results == 0 ){
    return null
   }
    return {
      status : "success",
      message : "product deleted successfully"
    }
    
  }
  }catch(error){
    throw new Error(error.message)
  }
}











module.exports ={
  createProduct,getProductById,getAllProducts,deleteProductById
}