const express = require('express');
const router = express.Router();

var adminC = require('../controllers/admin_controller');
//http://localhost:4000/admin/addCat
//http://localhost:4000/admin/addBr
//http://localhost:4000/admin/addPro
router.get("/addCat" , adminC.categoryPage);
router.get("/addBr" , adminC.brandPage);
router.get("/addPro" , adminC.productPage);
router.post("/category-action" , adminC.categoryAction);
router.post("/brand-action" , adminC.brandAction);
router.get("/async" , adminC.asyncFunction);
router.post("/product-action" , adminC.productAction);




module.exports = router;
