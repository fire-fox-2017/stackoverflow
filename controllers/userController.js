var User = require('../models/user');
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken');

require('dotenv').config();


exports.signup = (req, res, next) => {
  var newUser = User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    phone: req.body.phone
  })

  newUser.save( (err, user) => {
    if(err) res.send(err);

    res.send(user);
  })
}

exports.signin = (req, res, next) => {
  let user = req.user;
  console.log(user);

  var token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  res.send(token);  
}

exports.get_all = (req, res, next) => {
  User.find( {}, (err, users) => {
    if(err) res.send(err);

    res.send(users);
  })
}
