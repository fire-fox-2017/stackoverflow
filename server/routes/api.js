const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

// user route
router.get('/user', user.getAll);
router.post('/user/signup', user.signup);
router.put('/user/edit/:id', user.edit);
router.delete('/user/delete/:id', user.delete);

module.exports = router;