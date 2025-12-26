const {Order} = require("../domain/order")


let order = new Order({
    "ac": "df"
},  1.99)



let tax_details = [{
  "amount": 6.33,
  "zone_id": 2,
  "tax_category_id": 3880217089818077,
  "included_in_price": true,
  "name": "Sample Modifier Tax3"
}]

let products = [{
  "products__name": "Upma",
  "products__description": "Upma",
  "products__price": 9.0,
  "products__files": "[]",
  "products__tax_category_id": 3880217089818077,
  "products__category_id": 3899131312327677,
  "products__is_single_variant": true,
  "products__prod_size": null,
  "products__brand": null
}, {
  "products__name": "Biryani",
  "products__description": "Biryani",
  "products__price": 19.0,
  "products__files": "[]",
  "products__tax_category_id": 3880217089818077,
  "products__category_id": 3899131312327677,
  "products__is_single_variant": true,
  "products__prod_size": null,
  "products__brand": null,
}]




// order.addItems([{ "abv": "j sd" }])
order.addTaxDetails(tax_details)
order.addItems(products)
order.calculateTotal()
console.log(order.toJSON());

// console.log(order);

