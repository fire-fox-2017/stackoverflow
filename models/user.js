var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {
    type: String,
    required: [true, 'Email is required.'],
    validate: {
      validator: function(v) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(v);
      },
      message: '{VALUE} is not a valid email address.'
    }
  },
  password: {type: String, required: true},
  phone: {type: String, required: true},
})

var User = mongoose.model('User', userSchema)

module.exports = User;
