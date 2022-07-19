const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    productName:String,
    productPrice:Number,
    productDiscount:Number,
    productCategoryId:String,
    productBrandId:String,
    productImagePath:String,
    productDesc:String
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;

// image/jpeg
// image/png
// image/gif