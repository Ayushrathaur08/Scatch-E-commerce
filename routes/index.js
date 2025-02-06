const express = require('express');
const router = express.Router();
const isLoggedIn  = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');



router.get('/', isLoggedIn, (req, res) => {
    let error = req.flash('error');
    res.render('index', { error, isLoggedIn:false });
}
);

router.get('/shop', isLoggedIn, async (req, res) => {
    let products = await productModel.find();
    let Success=req.flash("Success")
    res.render('shop', { products,Success });
});

router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await user.Module.findOne({ email: req.user.email }).populate("cart");
    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render("cart", { user ,bill});
    console.log(user);
});

router.get("/addtocart/:productid",isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("Success", "Added to Cart");
    res.redirect('/shop')
})

router.get('/logout', (req, res) => {
    res.render('/shop')
})

    module.exports = router;