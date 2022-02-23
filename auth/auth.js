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
const checkToken = function (req, res, next) {
    let token = req.get('Authorization');
    if (token) {
        token = token.slice(7)

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send(err)
            } else {
                let user = decoded.result
                next();
            }
        })
    } else {
        return res.status(401).send()
    }
}

module.exports = { generateToken, checkToken, hashPassword }
