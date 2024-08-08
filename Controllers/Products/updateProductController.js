const productModel = require("../../models/product")

const updateProductContoller = async( req, res )=>{

    const user = req.session.user
    try
    {
        const { id } = req.params
        if(user.admin)
        {
            const {  name, price, description, category, stock } = req.body
            const updateProduct = await productModel.findByIdAndUpdate(id, { name, price, description, category, stock }, {
                new: true
            })
          if(updateProduct)
          {
            return res.status(202).json({message: "product updated successfully"})
          }
          else
          {
            return res.status(404).json({message: "product not found"})
          }
        }
        else
        {
            return res.status(404).json({message : "you are not authorized to update a task"})
        }
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
   
}

module.exports = updateProductContoller