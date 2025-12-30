

const { connectMongo } = require("../config/mongo");
const mongoose = require("mongoose");
const { Order } = require("../domain/order");
function orderService (){

const order = new Order()
const productIds = [
  "68ee53c195cf76d135e4e29d",
  "68ee53c895cf76d135e4e29e"
];
let products = []

async function getData() {
  const conn = await connectMongo();

  products = await conn.db
    .collection("products")
    .find({
      _id: {
        $in: productIds.map(id => new mongoose.Types.ObjectId(id))
      }
    })
    .toArray();

  // console.log(products);
}


(async ()=>{
  await getData();
  order.addTaxDetails(tax_details)
  order.addItems(products)
  order.calculateTotal()
  console.log(order.toJSON());

  // console.log(order);

})()



}



module.exports = {orderService}

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






