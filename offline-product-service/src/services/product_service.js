const { error } = require("winston");
const { Product } = require("../model/product")
const logger = require("../utills/logger")

const createProduct = async (name, price, description, status, category_id, store_id, service_type, subscribed_application_id, product_id, variant_id,tax_category_id) => {
    // logger.debug("Creating product with name: %s", name )
    logger.debug(`Creating product with name: ${name}`);


    try {
        const product__name = name
        const product__descritpion = description
        const product__category_id = category_id
        const product__price = price
        const product__status = status
        const product__store_id = store_id
        const products__service_type = service_type
        const product__id = product_id/*  */
        const variant__id = variant_id
        let application_id = subscribed_application_id
        const product__tax_category_id = tax_category_id
        let results = await Product.create({
            product__name,
            product__descritpion,
            product__category_id,
            product__price,
            product__status,
            product__store_id,
            products__service_type,
            application_id,
            product__id,
            variant__id,
            product__tax_category_id
        })
        return results
    } catch (error) {
        throw error
    }
}


const deleteProduct = async (id) => {
    try {
        logger.info(`Received request deleteProduct service : ${id}`)
        let results = await Product.findByIdAndDelete(id)
        return results
    } catch (error) {
        throw error
    }
}

const getProducts = async (store_id, status, service_types, category_ids, subscribed_application_id) => {
    //   {
    //     "store_id": 1,
    //     "application_id": 5454,
    //     "category_ids": [
    //         10
    //     ],
    //     "service_types": "delivery"
    // }

    try {
        let filter = {
            // application_id: subscribed_application_id
        }
        if (store_id) {
            filter.product__store_id = store_id
        }
        if (status) {
            filter.product__status = status
        }
        if (service_types) {
            // console.log(service_types);

            let service_type_array = service_types.split(",")//.map((data)=>{data.trim()})
            //    console.log(service_type_array);

            filter.products__service_type = { $in: service_type_array }
        }
        if (category_ids && category_ids.length > 0) {
            filter.product__category_id = { $in: category_ids }
        }

        // console.log("filter : " , filter);

        let results = await Product.find(filter)
        if (!results.length > 0) {
            return null
        }
        return results
    }
    catch (error) {
        throw error
    }
}


// const productIndexSearch = async (name) => {

//     // console.log("abccccc");

//     let results = Product.find(
//         {
//             $text: {
//                 $search: name
//             }
//         }, 
//         {
//         score: { $meta: "textScore" },
//         }

//     ).then((data) => {
//         return data
//     }).catch(
//         (err) => {
//             return err
//         }
//     )

//     //  const results = await Product.collection.indexes();
//     //  console.log(results);

//     return results
// }




const productIndexSearch = async (name) => {
    try {
        let textResults = []

        let map = new Map()

        textResults = await Product.find(
            {
                $text: {
                    $search: name
                },
            },
            { score: { $meta: "textScore" } }
        )
            .sort({ score: { $meta: "textScore" } })
            .limit(10)


        textResults.forEach((data) => {
            map.set(data._id.toString(), data)
        })
        //    return map;

        if (map.size < 10) {
            let prefix_results = await Product.find({
                product__name: { $regex: `^${name}`, $options: "i" }
            })
                .limit(10 - map.size)
            // console.log("results2 ",results2);

            prefix_results.forEach(function (data) {
                map.set(data._id, data)
            })


            //    results = results.concat(results2)
            // console.log(results);

        }

        if (map.size < 10) {
            let substringResults = await Product.find({
                product__name: { $regex: name, $options: "i" }
            })
                .limit(10 - map.size)

            // console.log("substringResults",substringResults);

            substringResults.forEach(function (data) {
                map.set(data._id, data)
            })


            // textResults = textResults.concat(results3)
        }
        // export const productSearch = async (term) => {
        //   try {
        //     if (!term || term.trim() === "") return [];

        //     // Escape regex special characters
        //     const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        //     const allResults = new Map(); // to remove duplicates

        //     /** 1️⃣ TEXT INDEX SEARCH (word-based) **/
        //     const textResults = await Product.find(
        //       { $text: { $search: term } },
        //       { score: { $meta: "textScore" } }
        //     )
        //       .sort({ score: { $meta: "textScore" } })
        //       .limit(10)
        //       .lean();

        //     textResults.forEach((r) => allResults.set(r._id.toString(), r));

        //     /** 2️⃣ PREFIX SEARCH (uses B-tree index) **/
        //     if (allResults.size < 10) {
        //       const prefixResults = await Product.find({
        //         product__name: { $regex: `^${safeTerm}`, $options: "i" },
        //       })
        //         .limit(10 - allResults.size)
        //         .lean();

        //       prefixResults.forEach((r) => allResults.set(r._id.toString(), r));
        //     }

        //     /** 3️⃣ SUBSTRING SEARCH (fallback, slower) **/
        //     if (allResults.size < 10) {
        //       const substringResults = await Product.find({
        //         product__name: { $regex: safeTerm, $options: "i" },
        //       })
        //         .limit(10 - allResults.size)
        //         .lean();

        //       substringResults.forEach((r) => allResults.set(r._id.toString(), r));
        //     }

        //     return Array.from(allResults.values());
        //   } catch (err) {
        //     console.error("❌ Product search error:", err);
        //     return [];
        //   }
        // };


        //     const results =await Product.collection.getIndexes()
        // console.log(results);
        // console.log(results);



        // const results = await Product.find(
        //   { $text: { $search: name } },  // Perform the text search on product__name
        //   { score: { $meta: 'textScore' } }  // Project the score to sort by relevance
        // ).sort({ score: { $meta: 'textScore' } });  // Sort by the text score

        // const results =await Product.collection.getIndexes()
        // console.log(results);

        return Array.from(map.values());


    } catch (err) {
        throw err
    }
}



// {
//     $project: {
//       name: 1,  // Include the 'name' field in the output
//       description: 1,  // Include the 'description' field in the output
//       score: { $meta: "textScore" },  // Include the text search relevance score
//     },
//   },
//   {
//     $sort: { score: { $meta: "textScore" } },  // Sort the results by the relevance score (descending)
//   },

// console.log(productIndexSearch("Car"));







async function getProductById(id) {
    try {
        let results = await Product.find({
            product__id: id
        })
        
        if (!results || results.length < 1) {
            return null
        }
        return results
    } catch (error) {
        throw error
    }
}





















module.exports = { createProduct, deleteProduct, getProducts, productIndexSearch,getProductById }






// {
//     "name": "Butter naan",
//     "category_id": 100,
//     "price": "30",
//     "status": "active",
//     "store_id": 1,
//     "service_type": [
//         "pickup",
//         "delivery"
//     ],
//     "application_id": 5454,
//     "product_id":3,
//     "variant_id":1
// }


// Index Notes
// ================

// | Search Term | Step Used | Example Matches                   | Index Used             |
// | ----------- | --------- | --------------------------------- | ---------------------- |
// | `"Laptop"`  | Text      | `"Gaming Laptop"`, `"Laptop Pro"` | ✅ text index           |
// | `"Lap"`     | Prefix    | `"Laptop"`, `"Laptop Pro"`        | ✅ B-tree index         |
// | `"top"`     | Substring | `"Laptop"`, `"Desktop"`           | ❌ full scan (fallback) |



// | Step            | Type       | Index | Speed   | Notes                |
// | --------------- | ---------- | ----- | ------- | -------------------- |
// | 1️⃣ `$text`     | word-based | ✅     | ⚡ Fast  | best for full words  |
// | 2️⃣ `^regex`    | prefix     | ✅     | ⚡ Fast  | good for autosuggest |
// | 3️⃣ plain regex | substring  | ❌     | 🐢 Slow | fallback only        |




// | Product      | Score | Why                                             |
// | ------------ | ----- | ----------------------------------------------- |
// | Coffee Mug   | 5.0   | Contains both words “coffee” and “mug” in title |
// | Coffee Beans | 3.0   | Contains “coffee” but not “mug”                 |
// | Mug Stand    | 2.5   | Contains “mug” but not “coffee”                 |


// ✅ So “Coffee Mug” is most relevant — it matches both terms and likely more strongly in higher-weighted fields.
 

// {
//     "name": "Mushroom Pickle",
//     "category_id": 102,
//     "price": "29.99",
//     "status": "active",
//     "store_id": 1,
//     "service_type": ["pickup","delivery"],
//     "application_id": 5454
// }








// const getProducts = async (store_id, status, service_type, category_ids, subscribed_application_id) => {
//   try {
//     // Start building the filter object
//     let filter = {
//       application_id: subscribed_application_id
//     };

//     if (store_id) {
//       filter["product__store_id"] = store_id;
//     }

//     if (status) {
//       filter["product__status"] = status;
//     }

//     if (category_ids && category_ids.length > 0) {
//       // Find products where category is in the list
//       filter["product__category_id"] = { $in: category_ids };
//     }

//     if (service_type) {
//       // Split "pickup,curbside" => ["pickup", "curbside"]
//       const serviceTypesArray = service_type.split(",").map(s => s.trim());
//       // Match if any of the provided service types exist in the product
//       filter["products__service_type"] = { $in: serviceTypesArray };
//     }

//     // Query the database using Mongoose
//     const results = await Product.find(filter);

//     return results;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };
