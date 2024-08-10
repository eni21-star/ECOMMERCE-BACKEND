const userModel = require('../../models/users')
const productModel = require('../../models/product')
const cartModel = require("../../models/cart")


const addToCart = async (req, res) => {

    try {

        const user = req.session.user
        if(!user)
            {
                return res.status(401).json({message: "unauthorized"})
            }
            

        const {itemID, quantity } = req.body
        if (!itemID || !quantity) {
            res.status(400).json({ message: "bad request" })
        }

        else {

            const item = await productModel.findById({ _id: itemID })

            if (!item || item.stock <= 0)
                return res.status(404).json({ message: 'Item not found or out of stock' })
            else {
                const quantityInt = parseInt(quantity, 10)
                if (isNaN(quantityInt)) {
                    return res.status(400).json({ message: "Invalid quantity" });
                }

                if (quantityInt > item.stock) {

                    return res.status(400).json({ message: " cart quantity exceeds amount " })

                }
                else {


                    const cart = await cartModel.findOne({ product: itemID, user: user._id });


                    if (cart) {

                        const newquantity = quantityInt + cart.quantity;
                        if (newquantity <= 0) {
                            await cartModel.deleteOne({ product: itemID, user: user._id })
                                .then(() => { return res.status(200).json("item removed from cart") })
                                .catch(() => {
                                    return res.status(403).json({ message: "error removing item from cart" })
                                })

                        }
                        else {

                            cart.quantity = newquantity;
                            await cart.save()
                            const cartObject = cart.toObject()
                            delete cartObject._id
                            delete cartObject.user
                            delete cartObject.createdAt
                            delete cartObject.updatedAt
                            delete cartObject.__v
                            return res.status(200).json(cartObject)

                        }
                    }
                    else {

                        if (quantityInt > 0) {
                            const newCart = await cartModel.create({
                                user: user._id,
                                product: itemID,
                                name: item.name,
                                price: item.price,
                                quantity: quantityInt
                            })
                            const cartObject = newCart.toObject()
                            delete cartObject._id
                            delete cartObject.user
                            delete cartObject.createdAt
                            delete cartObject.updatedAt
                            delete cartObject.__v
                            return res.status(200).json(cartObject)

                        }
                        else {
                            return res.status(400).json({ message: "quantity is not valid" })
                        }

                    }
                }
            }


        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}



module.exports = addToCart