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

async function inValidateProductCache(redisClient, product_id) {
  let delete_post = `product:${product_id}`
  await redisClient.del(delete_post)
  let delete_posts = `products:*` //products:

  const keys = await redisClient.keys(delete_posts)
  if (keys.length > 0) {
    await redisClient.del(keys)
  }
  // const keys = await req.redisClient.keys("posts:*");
  // if (keys.length > 0) {
  //   await req.redisClient.del(keys);
  // }
}


const createProduct = async (req, redisClient) => {
  logger.info("Product Service started...");  // Normal info

  if (req) {
    try {
      const { name, price, description, status, category_id, store_id } = req;

      if (!name || !price) {
        logger.warn("Product creation attempt without required fields: name or price"); // Warning
        return { error: "Name and Price are required" };
      }

      const product = await Product.create({ name, price, description, status, category_id, store_id });

      await inValidateProductCache(redisClient, product.id)
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
const getProductById = async (id, redisClient) => {
  try {

    if (id) {

      let cachedProduct = await redisClient.get(`product:${id}`)

      if (cachedProduct) return JSON.parse(cachedProduct)
      results = await Product.findOne({
        where: {
          id: id
        }
      })

      if (results) {
        // redisClient.set(cachedPost,
        //   3600,
        //   JSON.stringify(results))
        let dataa = await redisClient.setex(`product:${id}`,
          3600,
          JSON.stringify(results)
        )
      }


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

const getAllProducts = async (limit, offset, sort, sort_type, store_id, category_id, status, redisClient) => {
  try {

    let product_limit = parseInt(limit) || 15
    let product_offset = parseInt(offset) || 0
    let product_sort = sort || "createdAt"
    let product_sort_type = sort_type || "asc"
    let product_store_id = parseInt(store_id) || 0
    let product_category_id = category_id
    let product_status = status



    let cached_key = `products:${product_offset}:${product_limit}`
    let conditions = []
    let replacements = []

    let cached_products = await redisClient.get(cached_key)
    console.log("cached_products",cached_products);
    if (cached_products) {
      return JSON.parse(cached_products)
    }




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




    // console.log(get_query);
    // console.log(total_count_query);


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

    let data = {
      status: "success",
      data: results[0],
      pagination: {
        total_count: total_count_results[0][0].total_count,
      },
    }

    redisClient.setex(cached_key, 33909, JSON.stringify(data))

    return data
  } catch (error) {
    throw new Error(error.message)
  }
}


const deleteProductById = async (id, redisClient) => {
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
      await inValidateProductCache(redisClient, id)
      return {
        status: "success",
        message: "product deleted successfully"
      }

    }
  } catch (error) {
    throw new Error(error.message)
  }
}




module.exports = {
  createProduct, getProductById, getAllProducts, deleteProductById
}






// async function invalidatePostCache(req, input) {
//   const cachedKey = `post:${input}`;
//   await req.redisClient.del(cachedKey);

//   const keys = await req.redisClient.keys("posts:*");
//   if (keys.length > 0) {
//     await req.redisClient.del(keys);
//   }
// }

// const createPost = async (req, res) => {
//   logger.info("Create post endpoint hit");
//   try {
//     //validate the schema
//     const { error } = validateCreatePost(req.body);
//     if (error) {
//       logger.warn("Validation error", error.details[0].message);
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message,
//       });
//     }
//     const { content, mediaIds } = req.body;
//     const newlyCreatedPost = new Post({
//       user: req.user.userId,
//       content,
//       mediaIds: mediaIds || [],
//     });

//     await newlyCreatedPost.save();

//     await publishEvent("post.created", {
//       postId: newlyCreatedPost._id.toString(),
//       userId: newlyCreatedPost.user.toString(),
//       content: newlyCreatedPost.content,
//       createdAt: newlyCreatedPost.createdAt,
//     });

//     await invalidatePostCache(req, newlyCreatedPost._id.toString());
//     logger.info("Post created successfully", newlyCreatedPost);
//     res.status(201).json({
//       success: true,
//       message: "Post created successfully",
//     });
//   } catch (e) {
//     logger.error("Error creating post", error);
//     res.status(500).json({
//       success: false,
//       message: "Error creating post",
//     });
//   }
// };

// const getAllPosts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const startIndex = (page - 1) * limit;

//     const cacheKey = `posts:${page}:${limit}`;
//     const cachedPosts = await req.redisClient.get(cacheKey);

//     if (cachedPosts) {
//       return res.json(JSON.parse(cachedPosts));
//     }

//     const posts = await Post.find({})
//       .sort({ createdAt: -1 })
//       .skip(startIndex)
//       .limit(limit);

//     const totalNoOfPosts = await Post.countDocuments();

//     const result = {
//       posts,
//       currentpage: page,
//       totalPages: Math.ceil(totalNoOfPosts / limit),
//       totalPosts: totalNoOfPosts,
//     };

//     //save your posts in redis cache
//     await req.redisClient.setex(cacheKey, 300, JSON.stringify(result));

//     res.json(result);
//   } catch (e) {
//     logger.error("Error fetching posts", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching posts",
//     });
//   }
// };

// const getPost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const cachekey = `post:${postId}`;
//     const cachedPost = await req.redisClient.get(cachekey);

//     if (cachedPost) {
//       return res.json(JSON.parse(cachedPost));
//     }

//     const singlePostDetailsbyId = await Post.findById(postId);

//     if (!singlePostDetailsbyId) {
//       return res.status(404).json({
//         message: "Post not found",
//         success: false,
//       });
//     }

//     await req.redisClient.setex(
//       cachedPost,
//       3600,
//       JSON.stringify(singlePostDetailsbyId)
//     );

//     res.json(singlePostDetailsbyId);
//   } catch (e) {
//     logger.error("Error fetching post", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching post by ID",
//     });
//   }
// };

// const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user.userId,
//     });

//     if (!post) {
//       return res.status(404).json({
//         message: "Post not found",
//         success: false,
//       });
//     }

//     //publish post delete method ->
//     await publishEvent("post.deleted", {
//       postId: post._id.toString(),
//       userId: req.user.userId,
//       mediaIds: post.mediaIds,
//     });

//     await invalidatePostCache(req, req.params.id);
//     res.json({
//       message: "Post deleted successfully",
//     });
//   } catch (e) {
//     logger.error("Error deleting post", error);
//     res.status(500).json({
//       success: false,
//       message: "Error deleting post",
//     });
//   }
// };