const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const post = require('../controllers/post');
const passport = require('passport')

// user routes
router.get('/user', user.getAll);
router.post('/user/signup', user.signup);
router.put('/user/edit/:id', user.edit);
router.delete('/user/delete/:id', user.delete);
router.post('/user/signin', passport.authenticate('local', {session: false}), (req, res) => {
  res.send(req.user);
});

// post routes
router.post('/post/create/:userId', post.create);

module.exports = router;