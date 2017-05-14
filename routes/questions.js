var express = require('express');
var router = express.Router();
var passport = require('passport');
var question_controller = require('../controllers/questionController');
var helper = require('../helpers/jwt')


router.post('/create', helper.verify_normal, question_controller.create);
router.get('/', question_controller.get_all);

router.post('/add_answer/:id', helper.verify_normal, question_controller.add_answer);

module.exports = router;
