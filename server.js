const express = require('express')
const app = express()
const mongoose = require("mongoose")
const env = require("dotenv").config()
const sessionConnect = require("./express-session/express-session");
const sessionLimit = require("./session-limiter/sessionlimiter")

app.use(express.json())
sessionConnect(app)
sessionLimit(app)


const registerRoute = require("./routes/Authentication/Register")
const loginRoute = require("./routes/Authentication/login")
const addtoCartroute = require("./routes/Cart/addtoCart")
//products
const viewAllProductsRoute = require("./routes/Products/viewproducts")
const getOneProductRoute = require("./routes/Products/singleproduct")
const uploadProductRoute = require("./routes/Products/uploadProduct")
const updateProductRoute = require("./routes/Products/updateProduct")
const deleteProductRoute = require("./routes/Products/deleteProduct")

// cart
const removeitemRoute = require("./routes/Cart/removeitem")
const clearcartRoute = require("./routes/Cart/clearCart")
const logoutRoute = require("./routes/Authentication/logout")
const viewcartRoute = require("./routes/Cart/viewcart")

// user management
const usermanagementRoute = require("./routes/userManagement/usermanagement")

// Product Reviews
const reviewProductRoute = require("./routes/reviews/Productreviews")
// checkout (not for peoduction)
const checkoutRoute = require("./routes/checkout/checkOut")

//invoice
const invoiceRoute = require("./routes/invoice/invoice")

//Authentication
app.use('/api/v1/register', registerRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/logout', logoutRoute)

//Cart
app.use('/api/v1/addtocart', addtoCartroute);
app.use('/api/v1/cart', viewcartRoute);
app.use('/api/v1/removeitem', removeitemRoute)
app.use('/api/v1/clearcart', clearcartRoute)

//Product
app.use('/api/v1/products', viewAllProductsRoute)
app.use("/api/v1/product", getOneProductRoute)
app.use("/api/v1/product", uploadProductRoute)
app.use("/api/v1/update", updateProductRoute)
app.use("/api/v1/delete", deleteProductRoute)

// user management
app.use("/api/v1/users", usermanagementRoute)

// Product Reviews
app.use("/api/v1/review", reviewProductRoute)

// checkout (not for production)
app.use("/api/v1/checkout", checkoutRoute)

//invoice
app.use("/api/v1/invoice", invoiceRoute)

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("connected to DB successfully")
        app.listen(process.env.PORT, () => { console.log(`server is runing on port ${process.env.PORT}`) })
    })
    .catch(() => {
        console.log("connection to DB failed ")
    }) 