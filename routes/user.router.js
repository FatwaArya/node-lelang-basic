//make route for user using express
const express = require('express');
const user = require('./../controllers/user');
const router = new express.Router();

router.get('/', user.getAll);
router.get('/:id', user.getById);
router.post('/', user.insert);
router.put('/:id', user.update);
router.delete('/:id', user.delete);

//export user
module.exports = router;
