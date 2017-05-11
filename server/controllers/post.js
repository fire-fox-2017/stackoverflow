const Post = require('../models/post');
const User = require('../models/user');
const methods = {};

methods.create = (req, res, next) => {
  Post.create({
    userId: req.params.userId,
    title: req.body.title,
    content: req.body.content,
    postType: req.body.postType
  }, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      User.findOneAndUpdate({ _id: post.userId}, {$push: {postId: post._id}}, {safe: true, upsert: true}, (err, user) => {
        if(err) {
          res.json({error: err, success: false});
        } else {
          res.json({post: post, success: true, msg: 'successfully created new post'});
        }
      })
    }
  })
}

module.exports = methods;