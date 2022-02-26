//make router for barang using express
const express = require('express');
const item = require('./../controllers/barang');
const router = new express.Router();
const { checkToken } = require('./../auth/auth');



router.get('/', checkToken, item.getAll);
router.get('/:id', checkToken, item.getById);
router.post('/', checkToken, item.insert);
router.put('/:id', checkToken, item.update);
router.delete('/:id', checkToken, item.delete);

module.exports = router;
