const mongoose = require('mongoose');

const { Schema } = mongoose;

const brandSchema = new Schema({
    brName:String
});

const brandModel = mongoose.model('brands', brandSchema);

module.exports = brandModel;