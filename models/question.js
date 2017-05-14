var mongoose = require('mongoose')
var Schema = mongoose.Schema

var voteSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  vote: {type: Number, enum: [1, -1]}
})

var answerSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  votes: [voteSchema]
})

var questionSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  answers: [answerSchema],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  votes: [voteSchema]
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question
