const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const cookieParser = require("cookie-parser");
const productModel = require('../models/product-model'); 


exports.registerUser = async function  (req, res) {
  try {
    let { email, password, fullName } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    
   
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullName,
          });
          let token = generateToken(user);
          res.cookie("token", token, { httpOnly: true });
          res.send("User created successfully");
          res.send(user);
        }
      });
    });
  } catch (er) {
    res.status(500).send("Server Error");
  }
};



exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.send("Invalid email or password");

    
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        let products = await productModel.find();
        res.render("shop", { user, products });
      } else {
        res.status(400).send("Invalid email or password");
      }
    })
  } catch {
    res.status(500).send("Server Error");
  }
}

module.exports.logOut = async function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
}