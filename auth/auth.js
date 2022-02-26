//import bcrypt and jwt
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//hash password
const hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//generate token
const generateToken = function (user) {

    return jwt.sign({ user }, process.env.SECRET_KEY);
}

//checkToken
const checkToken = async (req, res, next) => {
    let token = req.get('Authorization').replace('Bearer ', '');
    let user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
}

module.exports = { generateToken, checkToken, hashPassword }
