// UserModel.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username:String,
    usermobile:Number,
    useremail:String,
    userpass:String
});

//bind schema with collection
const UserModel = mongoose.model('users', userSchema);

module.exports =UserModel;
