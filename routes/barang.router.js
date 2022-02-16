//make router for barang using express
const express = require('express');
const barang = require('./../controllers/barang');
const router = new express.Router();

router.get('/', barang.getAll);
router.get('/:id', barang.getById);
router.post('/', barang.insert);
router.put('/:id', barang.update);
router.delete('/:id', barang.delete);

module.exports = router;
