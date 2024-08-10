const mongoose = require("mongoose");
const env = require("dotenv").config()


const schema = new mongoose.Schema({

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

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    category:
    {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const outOfStock = mongoose.model("outofstock", schema);
module.exports = outOfStock