var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var answerSchema = new Schema({
  title: {type: String, required:true},
  content: {type:String, required: true},
  user_id: {type: Schema.Types.ObjectId, ref: 'User'}
})

var questionSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  answers: [answerSchema],
  user_id: {type: Schema.Types.ObjectId, ref: 'User'}
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question;
