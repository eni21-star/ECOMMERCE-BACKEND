const userModel = require('../../models/users')
const productModel = require('../../models/product')
const cartModel = require("../../models/cart")


const viewcart = async (req, res) => {

    const user = req.session.user
    
    try {

        const { userid } = req.body
        if (userid === user._id) {
            const cart = await cartModel.find({ user: userid })
            if (cart.length===0) {
              return  res.status(404).json({ message: "empty cart" })
            }
            else {
               return res.status(201).json(cart)
            }
        }
        else
        {
            return res.status(401).json("you are unauthorized to view this cart")
        }

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = viewcart