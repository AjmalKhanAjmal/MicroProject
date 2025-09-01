const Product =require("../models/product")
const createProduct = async (req) => {
  //  console.log("rom service");

  if (req) {
    try {
      const { name, price, description, status,categoty_id } = req

      if (!name || !price) {
        return { error: "Name and Price are required" };
      }

      const product = await Product.create({ name, price, description, status  });
      return product

    } catch (error) {
      return { error: error.message };
    }
  }

}

module.exports = createProduct