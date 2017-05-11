const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const post = require('../controllers/post');
const passport = require('passport')
const auth = require('../helpers/verify');

// USER ROUTES
router.get('/user', auth.isLogin, user.getAll);
router.post('/user/signup', user.signup);
router.put('/user/edit/:id', auth.isLogin, user.edit);
router.delete('/user/delete/:id', auth.isLogin, user.delete);
router.post('/user/signin', passport.authenticate('local', {session: false}), (req, res) => {
  res.send(req.user);
});

/* POST ROUTES */

// get question
router.get('/question', auth.isLogin, post.getAll);

// post new question
router.post('/question/create/:userId', auth.isLogin, post.createQuestion);

// post new answer
router.post('/answer/create/:postId', auth.isLogin, post.createAnswer);

// delete question
router.delete('/question/delete/:postId', auth.isLogin, post.delete);

module.exports = router;