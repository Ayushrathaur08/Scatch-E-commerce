const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const storage = multer.memoryStorage();

const productModel = require('../models/product-model');


router.post('/create', upload.single("image"), async (req, res) => {
    try {
        console.log("It's workinggggggggggggg")
        let { price, discount, bgcolor, panelColor, textColor, } = req.body;
        let products = await productModel.create({
            image: req.file.buffer,
            price,
            discount,
            bgcolor,
            panelColor,
            textColor
        });        
        
        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    };
});

module.exports = router;
