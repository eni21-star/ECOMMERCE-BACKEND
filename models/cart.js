const mongoose = require("mongoose");
const env = require("dotenv").config()





const schema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity:
    {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    })

const cart = mongoose.model("cart", schema);
module.exports = cart