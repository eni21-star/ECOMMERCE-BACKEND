const productModel = require("../../models/product")

const singleProductController = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "Product id is required" })
    }
    try {
        const product = await productModel.findById(id)
        if (product) {
            return res.status(200).json(product)
        }
        else {
            return res.status(404).json({ message: "Product not found" })
        }
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
module.exports = singleProductController;