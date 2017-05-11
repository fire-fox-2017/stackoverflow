const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const passport = require('passport')

// user route
router.get('/user', user.getAll);
router.post('/user/signup', user.signup);
router.put('/user/edit/:id', user.edit);
router.delete('/user/delete/:id', user.delete);
router.post('/user/signin', passport.authenticate('local', {session: false}), (req, res) => {
  res.send(req.user);
});

module.exports = router;