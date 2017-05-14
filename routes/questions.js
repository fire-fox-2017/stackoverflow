var express = require('express')
var router = express.Router()
var passport = require('passport')
var question_controller = require('../controllers/questionController')
var helper = require('../helpers/jwt')

router.post('/', helper.verify_normal, question_controller.create)
router.get('/', question_controller.get_all)
router.get('/:id', question_controller.get_one)

router.post('/add_answer/:id', helper.verify_normal, question_controller.add_answer)
router.post('/upvote/:id', helper.verify_normal, question_controller.upvote)
router.post('/downvote/:id', helper.verify_normal, question_controller.downvote)
router.post('/answerupvote/:id', helper.verify_normal, question_controller.answerUpvote)
router.post('/answerdownvote/:id', helper.verify_normal, question_controller.answerDownvote)

module.exports = router
