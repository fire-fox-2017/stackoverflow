const User = require('../models/user');
const pwh = require('password-hash');
const verify = require('../helpers/verify');
const methods = {};

methods.signup = (req, res, next) => {
  let name = req.body.name;
  let username = req.body.username;
  let password = pwh.generate(req.body.password);
  let role = req.body.role;

  User.create({
    name: name,
    username: username,
    password: password,
    role: 'User'
  }, (err, user) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({user: user, success: true, msg: `successfully registered user with username: ${user.username}`});
    }
  })
}

methods.signin = (username, password, next) => {
  User.findOne({username: username}, (err, user) => {
    if(!user) {
      next(null, {message: 'username atau password Anda salah', success: false})
    }
      else if(pwh.verify(password, user.password)) {
        let userData = Object.assign({}, user.toJSON());
        next(null, {message: 'login sukses', token: verify.auth(userData), success: true, username: user.username, userId: user._id, name: user.name});
        console.log(userData);
      } else {
        next(null, {message: 'password anda salah', success: false});
      }
  })
}

methods.getAll = (req, res, next) => {
  User.find({}, (err, user) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({user: user, success: true});
    }
  })
}

methods.delete = (req, res, next) => {
  let id = req.params.id;
  User.findByIdAndRemove(id, (err, done) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({done: done, success: true});
    }
  })
}

methods.edit = (req, res, next) => {
  User.findOne({_id: req.params.id}, (err, user) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      user.name = req.body.name ? req.body.name : user.name;
      user.username = req.body.username ? req.body.username : user.username;
      user.password = req.body.password ? pwh.generate(req.body.password) : user.password;
      user.role = req.body.role ? req.body.role : user.role;
      user.save();
      res.json({user: user, success: true});
    }
  })
}

module.exports = methods;