//make router for barang using express
const express = require('express');
const user = require('./../controllers/user');
const router = new express.Router();

router.put('/:id_user/:id_barang', user.bid);

//export
module.exports = router;