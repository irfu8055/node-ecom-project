const mongoose = require('mongoose');

async function dbConnect(){
    return await mongoose.connect('mongodb://localhost:27017/'+process.env.DATABASE);
}
var conn = dbConnect();
// console.log(conn);

conn.catch((err)=>console.log(err))