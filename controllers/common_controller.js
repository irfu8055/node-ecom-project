const validationM = require("../middlewares/validation");
const encdec = require("../middlewares/encrypt-decrypt");

const userM = require("../models/UserModel");

const catM = require("../models/categoryModel");
const brM = require("../models/BrandModel");
const proM = require("../models/ProductModel");

const async = require('async');

/***************************************/
// const db = require('monk')('localhost:27017/'+process.env.DATABASE);
/***************************************/
// const mongoose = require('mongoose');

// async function dbConnect(){
//     return await mongoose.connect('mongodb://localhost:27017/'+process.env.DATABASE);
// }
// var conn = dbConnect();
// console.log(conn);

// conn.then((response)=>{
//     // console.log("response");
//     // console.log(response);
// }).catch((err)=>
// console.log(err))
/***************************************/

const indexFunction = (req,res)=>{
    // res.send("Index Page")
    async.parallel({
        'task1':function(cb){
            catM.find({},function(error,docs){
                if(!error){
                    cb(null , docs);
                }
                else{
                    cb(error,null)
                }
            });
        },
        'task2':function(cb){
            brM.find({},function(error,docs){
                if(!error){
                    cb(null , docs);
                }
                else{
                    cb(error,null)
                }
            });

        },
        'task3':function(cb){
            proM.find({},function(error,docs){
                if(!error){
                    cb(null , docs);
                }
                else{
                    cb(error,null)
                }
            })
        }

    },function(err,results){
        if(!err){
            console.log(results);
            // res.send("indexpage")
            res.render("indexPage" , results);
            //{task1:[],task2:[],task3:[]}
        }
    }); 
   
}
const loginFunction = (req,res)=>{
    res.render("loginPage");
}
const cartFunction = (req,res)=>{
    var dataFromcookies = req.cookies.allProduct;
    // console.log(dataFromcookies);

    if(dataFromcookies === undefined){
        res.render("cartPage" , {msg :true,result:[]});
    }
    else{
        // console.log(dataFromcookies); // 10,20,30
        var arr= dataFromcookies.split(",");
        // console.log(arr); // [10,20,30]
        //db.inventory.find( { quantity: { $in: [ 5, 15 ] } }, { _id: 0 } )
        proM.find({_id:{$in:arr}} , function(err,docs){
            if(!err){
                // console.log(docs);
                res.render("cartPage" , {msg :false , result:docs});
            }
        })
        
    }
    // proM.find({} , function(err,docs){
    //     if(!err){
    //         console.log("cart")
    //         console.log(docs)
    //     }
    // })
    // res.render("cartPage");
}
const registerActionFunction = (req,res)=>{
    console.log(req.body);
    //validation for register Form
    if( validationM.userName(req.body.userName) ){
        res.send({msg:"Invalid Name"});
    }
    else if(validationM.userMobile(req.body.userMobile)){
        errMsg = "Invalid Mobile";
        res.send({msg:errMsg});
    }
    else if(validationM.userEmail(req.body.userEmail)){
        errMsg = "Invalid Email";
        res.send({msg:errMsg});
    }
    else if(validationM.userPassword(req.body.userPassword)){
        errMsg = "Invalid Password";
        res.send({msg:errMsg});
    }
    else if(req.body.userPassword!=req.body.userCpass){
        errMsg = "Invalid Confirm Password";
        res.send({msg:errMsg});
    }
    else{
        //remove confirm password 
        //encrypt password before storing in DB
        var curPass = req.body.userPassword;
        // console.log(curPass);
        var pass_enc = encdec.text_hash(curPass);
        // console.log(pass_enc);

        var userObj = {
            username:req.body.userName,
            usermobile:req.body.userMobile,
            useremail:req.body.userEmail,
            userpass:pass_enc
        }

        const instance_users = new userM(userObj);
        // instance_users.name = "Kirtan";
        // instance_users.age = 20;

        instance_users.save(function(err){
            if(!err){
                res.send({msg:"Product  Added"});
            }
            else{
                console.log(err)
            }
        })

       
    }
    //validation for register Form

    
}
const loginActionFunction = (req,res)=>{
    console.log(req.body);
    if(validationM.userEmail(req.body.userEmail)){
        errMsg = "Invalid Email";
        res.send({msg:errMsg});
    }
    else if(validationM.userPassword(req.body.userPassword)){
        errMsg = "Invalid Password";
        res.send({msg:errMsg});
    }
    else{
        // errMsg = "Ok";
        var txtEmail =req.body.userEmail; 
        var txtPass =req.body.userPassword;
        // console.log(txtEmail , txtPass)

        userM.find({useremail:txtEmail}, function (err, docs) {
            // docs.forEach
            if(!err){
                console.log("Data From Mongousing mongoose");
                console.log(docs);// [] , [{}]

                if(docs.length == 0){
                    res.send({msg:"Emailid does not exist"});
                }
                else{
                    dbPass = docs[0].userpass;
                    // console.log(dbPass);

                    var result_pass = encdec.compare_enc_value(txtPass,dbPass);
                    // console.log(result_pass);
                    if(result_pass){
                        res.send({msg:"Auth Success"});       
                    }
                    else{
                        res.send({msg:"Invalid Credential"});
                    }
                }
            }
        });
    }
    
}

const monkFunction = (req,res)=>{
    // db.get('users').insert({name:"hetal",age:26}).then(function(response){
    //     console.log(response);
    // }).catch((err)=>{
    //     console.log(error);
    // });

    // db.get('users').find({age:{$lt:20}}).then(function(response){
    //     console.log("response");
    //     console.log(response);
    // }).catch(function(err){
    //     console.log(err);
    // })

    // db.get("users").remove({name:"hetal"}).then(function(response){
    //     console.log(response);
    // }).catch((err)=>{
    //     console.log(err);
    // })

    
    // db.get("users").update({name:"Het"},{$set:{name:"Hetal",age:20}}).then(function(response){
    //     console.log(response);
    // }).catch(function(err){
    //     console.log(err);
    // })

    res.send("Route Called");

}

const mongooseFunction = function(req,res){
    //lets create Schema
    const { Schema } = mongoose;
    const userSchema = new Schema({
        name:String,
        age:Number,
        daterec: { type: Date, default: Date.now }
    })

    //bind schema with collection
    const userModel = mongoose.model('users', userSchema);

    //fetch data using model
    userModel.find({}, function (err, docs) {
        // docs.forEach
        if(!err){
            console.log("Data From Mongousing mongoose");
            console.log(docs);
        }
    });

    //store record in users collection
    var dataObj = {name:"karna",age:21}
    const instance_users = new userModel(dataObj);
    // instance_users.name = "Kirtan";
    // instance_users.age = 20;

    instance_users.save(function(err){
        if(!err){
            console.log("Record Added")
        }
        else{
            console.log(err)
        }
    })
    //store record in users collection


    //Remove Data From Mongodb
    userModel.remove({name:"karna"}, function (err, docs) {
        // docs.forEach
        if(!err){
            console.log("Data Remove From Mongousing mongoose");
            console.log(docs);
        }
    });


    //update record in Mongodb

    userModel.updateMany({age:19},{name:"xya user",age:40},{}, function (err, docs) {
        // docs.forEach
        if(!err){
            console.log("Data Updated");
            console.log(docs);
        }
        else{
            console.log("errror");
            console.log(err);
        }
    });
    


    res.send("Route Called");
}

const filterProductCategoryFunction=function(req,res){
    console.log(req.body);
    var categoryValue = req.body.catId;

    proM.find({productCategoryId:categoryValue},function(err,docs){
        if(!err){
            // console.log(docs)
            res.send({msg:docs});
        }
    })
    
}
const filterProductBrandFunction = (req,res)=>{
    // console.log(req.body);
    //{brid:ans}
    var rec = req.body.brid;
    proM.find({productBrandId:rec} , function(err,docs){
        // console.log(docs);
        if(!err){
           res.send({msg:docs});
        }
    })
}

const cartActionFunction = (req,res)=>{
    // console.log(req.body);
    var productIdForCart = req.body.productid;
    //{productid:kjjhjhkj21h3jh12h3}
    // console.log(productIdForCart);
    // return;
    //fetch data from cookies & we have assumed that our cookie variable name for cart is : allProduct

    var dataFromCookies = req.cookies.allProduct;
    // console.log(dataFromCookies); //undefined

    // return;
    cookieTime = 24*60*60*1000;

    if(dataFromCookies === undefined){
        // console.log('Add 1st Product in cookies');
        // return;
        res.cookie(
            'allProduct',
            productIdForCart,
            {maxAge: cookieTime}
        ).send({msg:"Product Added In Cart"});
    }
    else{
        // console.log('store data in cookies , 2nd product onward');
        //  10,20,30,40,60
        allDataFromCookies = dataFromCookies;

        recordTobeAdded = productIdForCart;

        // console.log(allDataFromCookies);
        console.log(recordTobeAdded);
        

        
        //10,20,30,40
        var arr = allDataFromCookies.split(",");
        console.log(arr); // [10,20,30]
        

        var checkproduct = arr.indexOf(recordTobeAdded);
        console.log(checkproduct);  // -1 or 1,2
        

        if(checkproduct == -1){
            // console.log('update your cart value');

            var newrecord = allDataFromCookies+","+recordTobeAdded;
            console.log(newrecord);

            res.cookie(
                'allProduct',
                newrecord,
                {maxAge: cookieTime})
            .send({msg:"Product Updated In Cart"});
        }
        else{
            res.send({msg : 'product Exist in Cart'});
        }
    }

    // res.send({msg:"Route Called For Cart"});
}

const deleteCartActionFunction = function(req,res){


    /*
        10,20,30,40
    */

    //{productValue:proid}
    // console.log(req.body);
    var proidTobeDeleted = req.body.productValue;
    // 30
    var dataFromCookies = req.cookies.allProduct;
    // 10,20,30,40
    // console.log(dataFromCookies);
    var arr = dataFromCookies.split(",");
    // console.log(arr);
    // [10,20,30,40]  or  [10]

    if(arr.length == 1){
        res.clearCookie('allProduct').send({msg :"Cart Empty"});
    }
    else{

        var indexNo = arr.indexOf(proidTobeDeleted);
        // console.log(indexNo);
        // index-2
        arr.splice(indexNo,1)
        // console.log(arr);
        // [10,20,40]

        var finalData = arr.join(",");
        // console.log(finalData);
        // 10,20,40
        cookieTime = 24*60*60*1000;
        res.cookie(
            'allProduct',
            finalData,
            {maxAge: cookieTime}
        ).send({msg:"Product Deleted From Cart"});
    }
}

const checkoutFunction = function(req,res){
    console.log(req.body);
    var all_data = req.body.all_quantity;

    // [10,20,30,40]
    // res.send("checkout page")
    var dataFromcookies = req.cookies.allProduct;
    // console.log(dataFromcookies);

    // console.log(dataFromcookies); // 10,20,30
    var arr= dataFromcookies.split(",");
    // console.log(arr); // [10,20,30]
    //db.inventory.find( { quantity: { $in: [ 5, 15 ] } }, { _id: 0 } )
    proM.find({_id:{$in:arr}} , function(err,docs){
        if(!err){
            // console.log(docs);
            res.render("checkoutPage" , {result:docs ,quantity:all_data});
        }
    })
}
module.exports = {
    checkoutFunction,
    deleteCartActionFunction,
    cartActionFunction,
    filterProductBrandFunction,
    indexFunction,
    loginFunction,
    cartFunction,
    registerActionFunction,
    loginActionFunction,
    monkFunction,
    mongooseFunction,filterProductCategoryFunction
}