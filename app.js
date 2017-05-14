var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
var passwordHash = require('password-hash')

require('dotenv').config();

var index = require('./routes/index')
var users = require('./routes/users')
var questions = require('./routes/questions')

passport.use(new Strategy(
  function(username, password, next) {
    let User = require('./models/user')

    User.findOne( {username: username}, (err, user) => {
      if(err) next(err);
      console.log(user)
      if(passwordHash.verify(password, user.password)) {
        next(null, user)
      } else {
        next("User entered wrong username and password");
      }
    })
  }
));



var app = express();

//connect to mongoDB DB
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/stickstack'
mongoose.connect(mongoDB);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


app.use('/', index);
app.use('/users', users);
app.use('/questions', questions);

app.listen(3000, function () {
  console.log('StickStack is listening on port 3000!')
})

module.exports = app;
