const { resolve } = require("path");

class Order {
  #items;
  #discount = 0;
  #tax_details;
  included_tax_total = 0
  sub_total = 0
  total = 0
  totallll = 0
  tip_total = 0
  constructor(user, platform_fee = 0) {
    this.user = user;
    // this.#items = items;
    this.paid = false;
    this.paymentRef = null;
    this.platform_fee = platform_fee
  }


  addItems(items) {
    try {
      if (!Array.isArray(items)) {
        let error = new Error("missing items or items not in array")
        throw error
      }
      this.#items = items;
      // console.log(this.#items);

    } catch (err) {
      console.log(err);

    }
  }


  initial_product_details = [{
    "product__id": 1,
    "products__price": 9.0,
    "products__tax_category_id": "68ee53c195cf76d135e4e29d",
  }, {
    "product__id": 1,
    "products__price": 19.0,
    "products__tax_category_id": "68ee53c195cf76d135e4e29d",
  }]

  discount = {
    "status": "success",
    "message": "Valid coupon",
    "discount_type": "amount",
    "amount": 10,
    "coupon_code": "XJLG4NM7P7",
    "minimum_cart_value": 1
  }



  addTaxDetails(tax) {
    this.#tax_details = tax
  }
  calculateSubTotal() {
    let sub_ttl = 0
    for (let i = 0; i < this.#items.length; i++) {
      let current_record = this.#items[i]
      sub_ttl += Number(current_record.product__price)
      // this.included_tax_total += this.#tax_details.reduce((accu, details) => {
      //   if (details.tax_category_id == current_record.products__tax_category_id) {
      //     return accu + current_record.product__price * details.amount / 100
      //   }
      // }, 0)
    }
    this.sub_total = sub_ttl
    // this.total = this.platform_fee + this.included_tax_total + this.sub_total
  }





  async calculateTax(db_tax_details) {
    await Promise.all(
      this.#items.map(async (item) => {
        const taxRule = db_tax_details.find(
          (tax) => String(tax.id) === String(item._id)
        );

        if (taxRule) {
          this.included_tax_total +=
            Number(item.product__price) *
            (Number(taxRule.amount) / 100);
        }
      })
    );
  }

  async calculateTip(tip_type, tip_amount) {
    if (tip_amount && tip_type) {
      if (tip_type == 'percentage') {
        this.tip_total = this.sub_total * (tip_amount / 100)
        return this.tip_total
      } else if (tip_type == 'amount') {
          this.tip_total = tip_amount
        return  this.tip_total
      }
    }
  }
  calculateDiscount() {

  }
  toJSON() {
    return {
      "sub_total": this.sub_total.toFixed(2),
      "total": this.total.toFixed(2),
      "included_tax_total": this.included_tax_total.toFixed(2),
      "platform_fee": this.platform_fee.toFixed(2),
      "tip_total":this.tip_total

    }

  }

}

module.exports = { Order }