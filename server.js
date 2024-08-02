const express = require('express')
const app = express()
const mongoose = require("mongoose")
const env =require("dotenv").config()
const sessionConnect = require("./express-session/express-session");

app.use(express.json())
sessionConnect(app);


const registerRoute = require("./routes/Authentication/Register")
const loginRoute = require("./routes/Authentication/login")
const addtoCartroute =require("./routes/Cart/addtoCart")
const removeitemRoute = require("./routes/Cart/removeitem")
const clearcartRoute = require("./routes/Cart/clearCart")
const logoutRoute = require("./routes/Authentication/logout")


const viewcartRoute =require("./routes/Cart/viewcart")


app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/addtocart', addtoCartroute);
app.use('/cart', viewcartRoute);
app.use('/removeitem', removeitemRoute)
app.use('/clearcart', clearcartRoute)
app.use('/logout', logoutRoute)






mongoose.connect(process.env.MONGO_DB)
.then(()=>{
console.log("connected to database successfully")    
app.listen(process.env.PORT, ()=>{console.log(`server is runing on port ${process.env.PORT}`)})
})
.catch(()=>{
    console.log("connection to DB failed ")
})