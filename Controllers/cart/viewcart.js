const userModel = require('../../models/users')
const productModel = require('../../models/product')
const cartModel = require("../../models/cart")


const viewcart = async (req, res) => {

    const user = req.session.user
    if(!user)
    {
        return res.status(401).json({message: "unauthorized"})
    }
    
    try {

      
            const cart = await cartModel.find({ user: user._id })
            if (cart.length===0) {
              return  res.status(204).json({ message: "empty cart" })
            }
            else {
               return res.status(200).json(cart)
            }
    

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = viewcart