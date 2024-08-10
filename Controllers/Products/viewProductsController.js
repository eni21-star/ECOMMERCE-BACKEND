const productModel = require("../../models/product");

const viewProductsController = async (req, res) => {

  try {


    const products = await productModel.find();
    if (products) {
      return res.status(200).json(products)
    }
    else {
      return res.status(404).json({ message: "No products found" })
    }
  }
  catch (err) {
    return res.status(500).json(err.message)
  }



}
module.exports = viewProductsController
