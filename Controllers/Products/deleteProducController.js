const productModel = require("../../models/product")

const deleteProductController = async (req,res)=>{
  const user = req.session.user
  if(user.admin)
  {
    try {
        const {id}= req.params
        const deleteProduct = await productModel.findByIdAndDelete(id)
        if(!deleteProduct){
            return res.status(404).json({message:"Product not found"})
            }
            else
            {
            res.status(200).json({message:"Product deleted successfully"})
            }
    } catch (error) {
        res.status(500).json(error.message)
    }
  }
 else
 {
    res.status(401).json({message:"You are not authorized to delete product"})
    }
   
}

module.exports = deleteProductController