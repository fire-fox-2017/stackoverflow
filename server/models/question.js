const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  content: {type: String, required: true},
  answer: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}]
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;