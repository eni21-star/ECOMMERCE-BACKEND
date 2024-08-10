const mongoose = require("mongoose");
const env = require("dotenv").config()




const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        


    },
    description: {
        type: String,
        required: true,


    },
    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    })

    const product = mongoose.model("products", schema);
module.exports = product