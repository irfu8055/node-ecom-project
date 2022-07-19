const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    catName:String
});

//bind schema with collection
const UserModel = mongoose.model('categories', userSchema);

module.exports =UserModel;