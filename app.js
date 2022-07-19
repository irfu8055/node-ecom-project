var cookieParser = require('cookie-parser');
require('dotenv').config();
var bodyParser = require('body-parser');
var dbconn = require('./database/dbconfig');

const express = require('express');
const app = express();

const commonR= require("./routes/common_route");
const adminR= require("./routes/admin_route");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/public" , express.static("assets"));

app.use("/",commonR);
app.use("/admin",adminR);
//http://localhost:4000/admin
app.listen(process.env.PORT , process.env.HOST , ()=>{
    console.log("Working");
})