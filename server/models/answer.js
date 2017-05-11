const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let answerSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  content: {type: String, required: true},
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}]
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;