    const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    cart:[
    {
        type: mongoose.Schema.Types.ObjectId ,
        ref:"product",
        },
    ],
    isAmin: Boolean,
    orders: [],
    contact: Number,
    picture:String
})
module.exports= mongoose.model('User', userSchema);