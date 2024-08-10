const session = require("express-session")
const cartModel = require("../../models/cart")
const userModel = require("../../models/users")
const productModel = require("../../models/product")
const invoiceModel = require("../../models/invoices");
const outOfStockModel = require("../../models/outofstock")

// extra feauture not intended to be used in a production environment
const checkout = async ( req,res )=>{
   

    try {

        const user = req.session.user
        const { houseAdrress, shipping } = req.body

        let invoiceArray = []
        let stockValue = 0;
        let stockArray = []
        let productidArray = []
        let insufficientStock = false
        let insufficientproducts = []
        if (!user) {
            return res.status(401).json({ message: "unauthorized" })
        }
        const cart = await cartModel.find({ user: user._id })
        if (cart.length === 0) {
            return res.status(404).json({ message: "cart is empty" })
        }
        const productIds = cart.map((id) => id.product)
        let cartQuantity = cart.map((quant) => quant.quantity)
        const totalPay = cart.map((total) => total.price)
        let total = 0

        for (let i = 0; i < productIds.length; i++) {

            const findProduct = await productModel.findById(productIds[i]);
            if (!findProduct) {
                continue; // Skip to the next iteration if product is not found
            }

            let { stock } = findProduct;
            stock = Number(stock);
            const quantity = Number(cartQuantity[i]);

            if (quantity > stock) {
                insufficientStock = true;
                insufficientproducts.push(findProduct);
                break; // Exit the loop if there is insufficient stock
            } else {
                stock -= quantity;
                stockValue = stock
                stockArray.push(stockValue)
                //  productidArray.push(productIds[i])

            }

        }

        if (insufficientStock) {
            for(let i = 0; i< insufficientproducts.length; i++)
            {
                const {createdAt,updatedAt,__v, ...rest } = insufficientproducts[i].toObject()
                console.log(rest)
                if(rest.stock==0){
                    await outOfStockModel.create({
                        product: rest._id,
                        name: rest.name,
                        description: rest.description,
                        price: rest.price,
                        category: rest.category
                    })

                  //  await productModel.findByIdAndDelete(productIds[i])

                }
            }

            return res.status(404).json({ message: "Quantity exceeds stock, or product might be out of stock" });

        }
        else {
            for (let i = 0; i < stockArray.length; i++) {
                const quantity = Number(cartQuantity[i]);
                const updateStock = await productModel.findByIdAndUpdate({ _id: productIds[i] }, { stock: stockArray[i] }, { new: true });
                if (!updateStock) {
                    return res.status(500).json({ message: "server error" })
                }
                total += totalPay[i] * quantity;
                const pricePer = totalPay[i] * quantity
                const invoice = await invoiceModel.create({
                    user: user._id,
                    product: productIds[i],
                    name: user.username,
                    productName: updateStock.name,
                    price: pricePer,
                    quantity: cartQuantity[i],
                    address: houseAdrress,
                    shippingCourier: shipping
                })
                const invoiceObject = invoice.toObject()
                delete invoiceObject.user
                delete invoiceObject.product
                delete invoiceObject._id
                delete invoiceObject.createdAt
                delete invoiceObject.updatedAt
                delete invoiceObject.__v
                invoiceArray.push(invoiceObject)

            }
            await cartModel.deleteMany({user: user._id})
          return  res.status(202).json({invoiceArray, total})

        }
    } catch (error) {
       return res.status(500).json(error.message)
    }
}

module.exports = checkout