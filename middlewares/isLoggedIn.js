const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) req.flash("error", "Unauthorized");
  return res.redirect("/");

  try {
    let decode = jwt.verify(req.cookies.token, process.env.JWT_KEYS);
    let user = await userModel
      .findOne({ email: decode.email })
      .select("-password");
    req.user = user;
    next();
  } catch (er) {
    req.flash("error", "Unauthorized");
    return res.redirect("/");
  }
};
