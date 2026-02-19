const { connectMongo } = require("../config/mongo");
const mongoose = require("mongoose");
const { Order } = require("../domain/order");
const { orderQueue } = require("../queues/email.queue")
// const { getIO } = require('../socket/index')
const axios = require("axios")
async function orderService(payload) {
  try {
    let product_ids = []
    let tax_category_ids = []
    const order = new Order()

    if (payload?.data?.order_details) {
      product_ids = payload.data.order_details.map((item) => item.product_id)
    }

    // 1️⃣ Data fetching
    products = await getProductsData(product_ids);
    if (products) {
      tax_category_ids = products.map((item) => item.product__tax_category_id)
    }
    let tax_details = await getTaxDetails(tax_category_ids)

    // 2️⃣ Business logic
    order.addItems(products)
    order.addTaxDetails(tax_details)
    order.calculateSubTotal()
    order.calculateTax()
    // order.calculateTip("percentage", 10)


    const response = order.toJSON()

    // Push to queue
    let job = await orderQueue.add("order_created", response);

    return response

  } catch (error) {
    return error.message
  }

}


async function getProductsData(productIds) {
  const conn = await connectMongo();
  // const productIds = [
  //   "68ee53c195cf76d135e4e29d",
  //   "68ee53c895cf76d135e4e29e"
  // ];


  products = await conn.db
    .collection("products")
    .find({
      product__id: {
        // $in: productIds.map(id => new mongoose.Types.ObjectId(id))
        $in: [...productIds]

      }
    })
    .toArray();

  return products
}




// orderService()


let payload = {
  "data": {
    "order_details": [{ "product_id": 1 }, { "product_id": 2 }, { "product_id": 4 }, { "product_id": 5 }]
  }

}

// orderService(payload)



async function getTaxDetails(tax_category_ids) {
  try {
    console.log("tadsdvs", tax_category_ids);

    url = 'http://localhost:3004/api/tax/tax_categories'
    payload = {
      "tax_category_ids": tax_category_ids
    }
    let results = await axios.post(url, payload)
    return results.data
  } catch (error) {

    // 🔴 1. Service not running / connection refused
    // if (error.code === "ECONNREFUSED") {
    //   console.error("Tax Service Down ❌");
    //   throw new Error("TAX_SERVICE_UNAVAILABLE");
    // }
    // const errorr = new Error(error.message)
    // throw error
    console.log("errror from getTaxDetails : ", error.message);

  }

}



module.exports = { orderService }



// let products = [{
//   "products__name": "Upma",
//   "products__description": "Upma",
//   "products__price": 9.0,
//   "products__files": "[]",
//   "products__tax_category_id": 3880217089818077,
//   "products__category_id": 3899131312327677,
//   "products__is_single_variant": true,
//   "products__prod_size": null,
//   "products__brand": null
// }, {
//   "products__name": "Biryani",
//   "products__description": "Biryani",
//   "products__price": 19.0,
//   "products__files": "[]",
//   "products__tax_category_id": 3880217089818077,
//   "products__category_id": 3899131312327677,
//   "products__is_single_variant": true,
//   "products__prod_size": null,
//   "products__brand": null,
// }]






