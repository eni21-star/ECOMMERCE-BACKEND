const express = require('express')
const app = express()
const mongoose = require("mongoose")
const env =require("dotenv").config()
const sessionConnect = require("./express-session/express-session");
const sessionLimit = require("./session-limiter/sessionlimiter")

app.use(express.json())
sessionConnect(app)
sessionLimit(app)


const registerRoute = require("./routes/Authentication/Register")
const loginRoute = require("./routes/Authentication/login")
const addtoCartroute =require("./routes/Cart/addtoCart")
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
const viewcartRoute =require("./routes/Cart/viewcart")

// user management
const usermanagementRoute = require("./routes/userManagement/usermanagement")

// Product Reviews
const reviewProductRoute = require("./routes/reviews/Productreviews")

//Authentication
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute)

//Cart
app.use('/addtocart', addtoCartroute);
app.use('/cart', viewcartRoute);
app.use('/removeitem', removeitemRoute)
app.use('/clearcart', clearcartRoute)

//Product
app.use('/products', viewAllProductsRoute)
app.use("/product", getOneProductRoute)
app.use("/product", uploadProductRoute)
app.use("/update", updateProductRoute)
app.use("/delete", deleteProductRoute)

// user management
app.use("/users", usermanagementRoute)

// Product Reviews
app.use("/review", reviewProductRoute)

mongoose.connect(process.env.MONGO_DB)
.then(()=>{
console.log("connected to database successfully")    
app.listen(process.env.PORT, ()=>{console.log(`server is runing on port ${process.env.PORT}`)})
})
.catch(()=>{
    console.log("connection to DB failed ")
})