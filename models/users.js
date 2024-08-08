const mongoose = require("mongoose");
const env = require("dotenv").config()



const schema = new mongoose.Schema({

    email: {
        type: String,
        required : true,
        unique: true

    },
    username: {
        type: String,
        unique: true

    },
    password: {
        type: String,
        required : true
        },
    admin:{
        type: Boolean,
    }
},
{
    timestamps: true
})

const users = mongoose.model("users", schema)

module.exports  = users;

