//make router for barang using express
const express = require('express');
const user = require('./../controllers/user');
const { checkToken } = require('./../auth/auth');

const router = new express.Router();

// //decode token
// function parseJwt(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// };
// let token = req.get('Authorization');

// let user =parseJwt(token);





router.put('/:id_barang', checkToken, user.bid);

//export
module.exports = router;