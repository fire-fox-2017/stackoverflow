const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let answerSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  content: String,
  votes: [{
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    count: {type: Number, enum: [1,-1]}
  }]
})
// post is question
let postSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  content: String,
  votes: [{
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    count: {type: Number, enum: [1,-1]}
  }],
  answers: [answerSchema] 
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;