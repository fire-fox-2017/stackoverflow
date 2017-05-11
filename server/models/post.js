const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  content: String,
  postType:{type:String, enum: ['q','a']},
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}]
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;