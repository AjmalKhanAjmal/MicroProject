const Product = require("../model/product_modal")
const db = require("../config/db")

const logger = require("../utills/logger")
// const createProduct = async (req) => {
//   //  console.log("rom service");

//   console.log("Product Service stareedd..");

//   if (req) {
//     try {
//       const { name, price, description, status, category_id, store_id } = req

//       if (!name || !price) {
//         return { error: "Name and Price are required" };
//       }

//       const product = await Product.create({ name, price, description, status, category_id, store_id });
//       console.log("product : ", product);

//       return product

//     } catch (error) {
//       return { error: error.message };
//     }
//   }

// }




const createProduct = async (req) => {
  logger.info("Product Service started...");  // Normal info

  if (req) {
    try {
      const { name, price, description, status, category_id, store_id } = req;

      if (!name || !price) {
        logger.warn("Product creation attempt without required fields: name or price"); // Warning
        return { error: "Name and Price are required" };
      }

      const product = await Product.create({ name, price, description, status, category_id, store_id });

      logger.info(`Product created successfully with ID: ${product.id}`);  // Success info
      logger.debug(`Product details: ${JSON.stringify(product)}`);  // Debug - very detailed info

      return product;
    } catch (error) {
      logger.error(`Error creating product: ${error.message}`, { stack: error.stack });  // Critical error
      return { error: error.message };
    }
  } else {
    logger.warn("Received empty or invalid product creation request");  // Warning when req is missing
    return { error: "Invalid request" };
  }
};
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

const getAllProducts = async (limit, offset, sort, sort_type, store_id, category_id, status) => {
  try {

    let product_limit = parseInt(limit) || 15
    let product_offset = parseInt(offset) || 0
    let product_sort = sort || "createdAt"
    let product_sort_type = sort_type || "asc"
    let product_store_id = parseInt(store_id) || 0
    let product_category_id = category_id
    let product_status = status


    let conditions = []
    let replacements = []


    if (product_store_id) {
      conditions.push('store_id = ?')
      replacements.push(product_store_id)
    }
    if (product_category_id) {
      conditions.push('category_id = ?')
      replacements.push(product_category_id)
    }
    if (product_status) {
      conditions.push('status = ? ')
      replacements.push(product_status)
    }




    let whereClause = conditions.join(" AND ")


    let get_query = ''
    let total_count_query = ''
    get_query = `SELECT id,name,descritpion,price,category_id,store_id,status,updatedAt,createdAt FROM shop.products where ${whereClause} order by ${product_sort} ${product_sort_type} limit ? offset ?`

    total_count_query = `SELECT count(*) as total_count FROM shop.products where ${whereClause}`




    // if (product_store_id && product_category_id && product_status) {
    //   get_query = `SELECT name,descritpion,price,category_id,store_id,status,updatedAt,createdAt FROM shop.products where store_id = ${product_store_id} AND category_id =  ${category_id} AND status = ${product_status} order by ${product_sort} ${product_sort_type} limit ${product_limit} offset ${product_offset}`
    //   total_count_query = `SELECT count(*) as total_count FROM shop.products`
    // }
    // else if (product_store_id && product_category_id) {
    //   get_query = `SELECT name,descritpion,price,category_id,status,store_id,updatedAt,createdAt FROM shop.products where store_id = ${product_store_id} AND category_id = ${category_id} order by ${product_sort} ${product_sort_type} limit ${product_limit} offset ${product_offset}`
    //   total_count_query = `SELECT count(*) as total_count FROM shop.products`
    // }
    // else if (product_store_id) {
    //   get_query = `SELECT name,descritpion,price,category_id,store_id,status,updatedAt,createdAt FROM shop.products where store_id =  ${product_store_id}  order by ${product_sort} ${product_sort_type} limit ${product_limit} offset ${product_offset}`
    //   total_count_query = `SELECT count(*) as total_count FROM shop.products`
    // }




    console.log(get_query);
    console.log(total_count_query);


    // get_query = `SELECT name,descritpion,price,category_id,store_id,updatedAt,createdAt FROM shop.products where store_id = ? order by ${product_sort} ${product_sort_type} limit ? offset ?`
    // total_count_query = `SELECT count(*) as total_count FROM shop.products`

    // results = await db.query(get_query, {
    //         replacements: [product_store_id, product_limit, product_offset]
    //       }
    //       )
    //       let total_count_results = await db.query(total_count_query)




    let results = []
    let total_count_results = []
    if (get_query) {
      results = await db.query(get_query, { replacements: [...replacements, product_limit, product_offset] })
      total_count_results = await db.query(total_count_query, { replacements })
    } else {
      return null
    }
    return {
      status: "success",
      data: results[0],
      pagination: {
        total_count: total_count_results[0][0].total_count,
      },
    }
  } catch (error) {
    throw new Error(error.message)
  }
}


const deleteProductById = async (id) => {
  try {
    if (id) {
      let results = await Product.destroy({
        where: {
          id: id
        }
      })
      if (results == 0) {
        return null
      }
      return {
        status: "success",
        message: "product deleted successfully"
      }

    }
  } catch (error) {
    throw new Error(error.message)
  }
}







































// const getAllProducts = async ({ limit = 15, offset = 0, sort = "createdAt", sort_type = "ASC", store_id, category_id, status }) => {
//   try {
//     const product_limit = parseInt(limit);
//     const product_offset = parseInt(offset);
//     const product_sort = sort;
//     const product_sort_type = sort_type.toUpperCase() === "DESC" ? "DESC" : "ASC";

//     const conditions = [];
//     const replacements = [];

//     if (store_id) {
//       conditions.push("store_id = ?");
//       replacements.push(parseInt(store_id));
//     }

//     if (category_id) {
//       conditions.push("category_id = ?");
//       replacements.push(parseInt(category_id));
//     }

//     if (status) {
//       conditions.push("status = ?");
//       replacements.push(status); // assuming status is a string like 'active'
//     }

//     const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

//     const get_query = `
//       SELECT name, description, price, category_id, store_id, status, updatedAt, createdAt
//       FROM shop.products
//       ${whereClause}
//       ORDER BY ${product_sort} ${product_sort_type}
//       LIMIT ? OFFSET ?
//     `;

//     const total_count_query = `
//       SELECT COUNT(*) as total_count
//       FROM shop.products
//       ${whereClause}
//     `;

//     // Add limit and offset to the end of replacements
//     const queryReplacements = [...replacements, product_limit, product_offset];

//     const results = await db.query(get_query, { replacements: queryReplacements });
//     const total_count_results = await db.query(total_count_query, { replacements });

//     return {
//       status: "success",
//       data: results[0],
//       pagination: {
//         total_count: total_count_results[0][0].total_count,
//       },
//     };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };















module.exports = {
  createProduct, getProductById, getAllProducts, deleteProductById
}



