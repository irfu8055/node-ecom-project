const express = require('express');
const router = express.Router();

const commonC = require("../controllers/common_controller");

router.get("/" , commonC.indexFunction);
router.get("/login" , commonC.loginFunction);
router.get("/cart" , commonC.cartFunction);

router.post("/register-action" , commonC.registerActionFunction);
router.post("/login-action" , commonC.loginActionFunction);


router.get("/monk" , commonC.monkFunction);
router.get("/mongoose" , commonC.mongooseFunction);

router.post("/filter-product-category",commonC.filterProductCategoryFunction)
router.post("/filter-product-brand",commonC.filterProductBrandFunction)

router.post("/cart-action",commonC.cartActionFunction);
router.post("/delete-cart-action",commonC.deleteCartActionFunction);
router.post("/checkout",commonC.checkoutFunction);





module.exports = router;