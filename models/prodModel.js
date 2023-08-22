const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:String,
    type:String,
    quantity:Number
});
module.exports = new mongoose.model('products',productSchema);