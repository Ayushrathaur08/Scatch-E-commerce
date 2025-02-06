const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const productRouter = require("./productsRouters"); // Import products router


if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        try {
            const owner = new ownerModel(req.body);
            await owner.save();
            res.send(owner);
        } catch (err) {
            res.status(400).send(err);
        }
    })
}


router.get('/admin', (req, res) => {
    let success = req.flash("success");
    res.render("createproducts",{success});
});

router.use("/products", productRouter); // Handles `/owners/products/...`



module.exports=router;
