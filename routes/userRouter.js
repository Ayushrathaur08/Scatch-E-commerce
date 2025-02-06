const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logOut } = require('../controllers/authController')

router.get("/", (req, res) => {
  res.send("Hello to my user");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);



module.exports = router;
