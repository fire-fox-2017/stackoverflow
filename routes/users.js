var express = require('express');
var router = express.Router();
var passport = require('passport');
var user_controller = require('../controllers/userController');


router.post('/signup', user_controller.signup);
router.post('/signin', passport.authenticate('local', {session: false}), user_controller.signin);

router.get('/', user_controller.get_all);


module.exports = router;
