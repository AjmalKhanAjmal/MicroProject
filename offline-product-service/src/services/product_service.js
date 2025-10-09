const { Product } = require("../model/product")
const logger = require("../utills/logger")

const createProduct = async (name, price, description, status, category_id, store_id, service_type, subscribed_application_id) => {
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
        let application_id = subscribed_application_id
        let results = await Product.create({
            product__name,
            product__descritpion,
            product__category_id,
            product__price,
            product__status,
            product__store_id,
            products__service_type,
            application_id
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

const getProducts = async (store_id, status, service_types,category_ids,subscribed_application_id) => {
    try {
        let filter = {
            application_id : subscribed_application_id
        }
        if (store_id) {
            filter.product__store_id = store_id
        }   
        if (status) {
            filter.product__status = status
        }
        if (service_types) {
            // console.log(service_types);
            
           let service_type_array  =  service_types.split(",")//.map((data)=>{data.trim()})
        //    console.log(service_type_array);
           
            filter.products__service_type = {$in:service_type_array}
        }
        if(category_ids && category_ids.length > 0){
            filter.product__category_id = {$in:category_ids}
        }

        // console.log("filter : " , filter);
        
        let results = await Product.find(filter)
        if(!results.length > 0){
            return null
        }
        return results
    }
    catch (error) {
        throw error
    }
}


module.exports = { createProduct, deleteProduct, getProducts }









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
