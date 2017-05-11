const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
      type: String
  },
  username: {
      type: String,
      uniqueCaseInsensitive: true
  },
  password: {
      type: String
  },
  role: {
      type: String
  },
  questionId: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  answerId: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  voteId: [{type: Schema.Types.ObjectId, ref: 'Vote'}]
})

userSchema.plugin(uniqueValidator)

let User = mongoose.model('User', userSchema);

module.exports = User;