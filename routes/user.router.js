//make route for user using express
const express = require('express');
const user = require('./../controllers/user');
const { checkToken } = require('./../auth/auth');
const router = new express.Router();

router.get('/', checkToken, user.getAll);
router.get('/:id', checkToken, user.getById);
router.post('/', user.insert);
router.post('/login', user.login);
router.put('/:id', checkToken, user.update);
router.delete('/:id', checkToken, user.delete);

//export user
module.exports = router;
