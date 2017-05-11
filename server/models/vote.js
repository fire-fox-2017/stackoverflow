const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let voteSchema = new Schema({
  userId: {type: String, ref: 'User'},
  count : {type: Number, enum: [1, -1]}
})

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;