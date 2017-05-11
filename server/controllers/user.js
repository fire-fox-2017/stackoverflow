const User = require('../models/user');
const pwh = require('password-hash');
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
    role: role
  }, (err, user) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({user: user, success: true});
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
      // user.save();
      res.json({user: user, success: true});
    }
  })
}

module.exports = methods;