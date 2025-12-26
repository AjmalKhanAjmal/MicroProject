class Order {
  #items;
  #discount = 0;
  #tax_details;
  included_tax_total = 0
  sub_total = 0
  total = 0
  totallll = 0
  constructor(user, platform_fee = 0 ) {
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


  addTaxDetails(tax) {
    this.#tax_details = tax
  }
  calculateTotal() {
    let sub_ttl = 0

    for (let i = 0; i < this.#items.length; i++) {
      let current_record = this.#items[i]
      sub_ttl += Number(current_record.products__price)
      this.included_tax_total += this.#tax_details.reduce((accu, details) => {
        if (details.tax_category_id == current_record.products__tax_category_id) {
          return accu + current_record.products__price * details.amount / 100
        }
      }, 0)
    }
    this.sub_total = sub_ttl


    this.total = this.platform_fee + this.included_tax_total + this.sub_total
  }


  toJSON() {
    return {
      "sub_total": this.sub_total.toFixed(2),
      "total": this.total.toFixed(2),
      "included_tax_total": this.included_tax_total.toFixed(2),
      "platform_fee": this.platform_fee.toFixed(2),
   
    }

  }

}

module.exports = {Order}