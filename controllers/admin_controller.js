const async = require('async');

const fileM =require("../middlewares/fileupload");

var catM = require("../models/categoryModel");
var brM = require('../models/BrandModel');
var proM = require('../models/ProductModel');

const categoryPage = function(req,res){
    res.render("admin/categoryPage_view");
}
const brandPage = function(req,res){
    res.render("admin/brandPage_view");
}
const productPage = function(req,res){

    ///////////////////////////////////////////
    // console.log(async)
    
    async.parallel({
        'catData':function(cb){
            catM.find({} , function(err,docs){
                if(!err){
                    cb(null , docs)
                }
                else{
                    cb(err,null);
                }
            });
        },
        'brData':function(cb){
            brM.find({} , function(err,docs){
                if(!err){
                    cb(null , docs)
                }
                else{
                    cb(err,null);
                }
            });
        }

    },function(error,results){
        if(error){
            console.log(error);
        }
        else{
            // console.log(results)
            /*
                {
                    catData:[{},{},{}],
                    brData:[{},{},{}]
                }
            */
            // res.render("admin/productPage_view" , {x:10,y:20,z:[10,20,30] }   );
            res.render("admin/productPage_view" , results   );
        }
    })
    
    //////////////////////////////////////////////

    // var arr1 = ['cat 1','cat 2','cat 3'];
    // var arr2 = ['br 1','br 2','br 3'];
    // var record = {
    //     catData:arr1,
    //     brData:arr2
    // }
    // res.render("admin/productPage_view" , record );

    //select data from catM & brM

    //callback hell
    /*
        catM.find({},function(err,doc_cat){
            brM.find({},function(err,doc_br){
                sizeM.find({},function(err,doc_size){
                    colorM.find({},function(err,doc_color){
            
                    })
                })
            })  
        })
    */

    // catM.find({},function(err,docs_cat){
    //     if(!err){
    //         console.log("Data From Category")
    //         console.log(docs_cat); // [{},{},{}]
            
    //         //fetch values from brands collection
    //         brM.find({},function(err_br,docs_br){
    //             if(!err_br){
    //                 console.log("Data From Brand")
    //                 console.log(docs_br); //[{},{}]
    //                 var record = {
    //                     catData:docs_cat,
    //                     brData:docs_br
    //                 }
    //                 res.render("admin/productPage_view",record );
    //             }
    //         });
    //     }
    // });
}

const categoryAction = function(req,res){
    // console.log(req.body);
    var catRec = req.body.catName;
    if(catRec==""){
        res.send({msg : "Category Empty"});
    }
    else{
        var catDataObject = {
            catName:catRec
        }

        const instance_users = new catM(catDataObject);
        // instance_users.name = "Kirtan";
        // instance_users.age = 20;

        instance_users.save(function(err){
            if(!err){
                res.send({msg:"Category Added"});
            }
            else{
                console.log(err)
            }
        })
    }
    
}

const brandAction = (req,res)=>{
    // console.log("Data From Jquery");
    // console.log(req.body);
    // {brName:'test'}

    if(req.body.brName == ""){
        res.send({msg:"Brand Name is Empty"})
    }
    else{
        //check value is existsor not
        brM.findOne({ brName: req.body.brName }, function (err, docs) {
            if(!err){
                // console.log("Data Received From Collection")
                // console.log(docs)
                if(docs !== null){
                    res.send({msg:"Brand Exist"});
                }
                else{
                    var brandDataObject = {
                        brName:req.body.brName
                    }
            
                    const instance_brand = new brM(brandDataObject);
                    // instance_users.name = "Kirtan";
                    // instance_users.age = 20;
            
                    instance_brand.save(function(err){
                        if(!err){
                            res.send({msg:"Brand Added"});
                        }
                        else{
                            console.log(err)
                        }
                    });
                }
            }            
        });
    }
}

const asyncFunction=(req,res)=>{
    //3s
    // catM.find({} , function(err,docs){
    //     if(!err){
    //         // res.send(docs)
    //         //4s ==> 7s
    //         brM.find({},function(errB , docsB){
    //             if(!errB){
    //                 res.send({x1:docs,x2:docsB})
    //             }
    //         })
    //     }
    // });

    // async.parallel({
    //     'categoryTask':function(cb){
    //         var rec = [{id:1,name:'cat1'},{id:1,name:'cat2'}];
    //         // console.log(typeof cb);
    //         setTimeout(function(){
    //             cb(null,rec);
    //         },3000);
    //     },
    //     'brandTask':function(cb){
    //         var rec = [{id:1,name:'br1'},{id:1,name:'b2'}];
    //         // console.log(typeof cb);
    //         setTimeout(function(){
    //             cb("Error For brand",null);
    //         },6000);
    //     }
    // } , function(err,result){
    //     if(!err){
    //         console.log(result);
    //     }
    //     else{
    //         console.log("Error Exist" , err);
    //     }
    // });

    async.parallel({
        'catData':function(cb){
            catM.find({} , function(err,docs){
                if(!err){
                    cb(null , docs)
                }
                else{
                    cb(err,null);
                }
            });
        },
        'brData':function(cb){
            brM.find({} , function(err,docs){
                if(!err){
                    cb(null , docs)
                }
                else{
                    cb(err,null);
                }
            });
        }

    },function(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results)
        }
    })
    
}

const productAction = function(req,res){
    
    var uniquData = Math.round(100000* Math.random());
    // console.log(uniquData);
    var path = "./assets/products/";
    var upload = fileM.doFileUpload(path,uniquData,"productImagePath");
    //<input type="file" name="productImagePath" />

    upload(req,res,function(err){
        if(err){
            console.log(err)
        }
        else{
            // console.log(req.body);
            // console.log(req.file);

            //product insertion in database
            req.body.productImagePath = req.file.filename;
            // console.log(req.body);

            const instance_product = new proM(req.body);
            // instance_users.name = "Kirtan";
            // instance_users.age = 20;

            instance_product.save(function(err){
                if(!err){
                    res.send({msg:"Product Added"});
                }
                else{
                    console.log(err)
                }
            })
        }
    });
}

module.exports = {
    categoryPage,brandPage,productPage,
    categoryAction,
    brandAction,
    asyncFunction,
    productAction
}