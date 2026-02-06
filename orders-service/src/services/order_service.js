const { connectMongo } = require("../config/mongo");
const mongoose = require("mongoose");
const { Order } = require("../domain/order");
const { getIO } = require('../socket/index')
const axios = require("axios")
async function orderService(payload) {
try{
  
  const order = new Order()
  let product_ids = []
  let tax_category_ids = []
  if (payload?.data?.order_details) {
    product_ids = payload.data.order_details.map((item) => item.product_id)
  }

  products = await getProductsData(product_ids);
  order.addItems(products)
  if(products){
    tax_category_ids = products.map((item)=>item.product__tax_category_id)
  }
console.log("tax_category_ids", tax_category_ids);


  let tax_details = getTaxDetails(tax_category_ids)

  console.log("tax_details",tax_details);
  

  // get parallel tax product with promise all
  order.addTaxDetails(tax_details)


  // order.calculateSubTotal()
  // order.calculateTax(db_tax_details)
  // order.calculateTip("percentage", 10)

  setTimeout(() => {
    getIO().emit("orderCreated", order);
  }, 10000)

  // await Promise.all([order.calculateTax(db_tax_details),order. calculateTip("percentage",10)])

  // console.log(order.toJSON());
  return order.toJSON()
}catch(error){
  console.log("eror Message  : ",error.message

  );
  
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

orderService(payload)



async function getTaxDetails(tax_category_ids) {
  console.log("tadsdvs" , tax_category_ids);
  
  url = 'http://localhost:3004/api/tax/tax_categories'
  payload = {
    "tax_category_ids": tax_category_ids
  }
  let results = await axios.post(url, payload)
  console.log(results.data);

}



module.exports = { orderService }

let tax_details = [{
  "amount": 6.33,
  "zone_id": 2,
  "tax_category_id": 3880217089818077,
  "included_in_price": true,
  "name": "Sample Modifier Tax3"
}]

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






