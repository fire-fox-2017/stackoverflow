const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let voteSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  count : {type: Number, min: -1, max: 1, default: 0}
})

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;