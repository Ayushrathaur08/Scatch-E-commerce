const Jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return Jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEYS);
}


module.exports= generateToken;