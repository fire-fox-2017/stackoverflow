const Post = require('../models/post');
const User = require('../models/user');
const helperTo = require('../helpers/verify');
const methods = {};

methods.createQuestion = (req, res, next) => {
  let decoded = helperTo.decode(req.headers.token);
  console.log('this is decoded in post controller: ');
  console.log(decoded)
  // let userId = req.params.userId;
  Post.create({
    userId: decoded._id,
    title: req.body.title,
    content: req.body.content,
  }, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      console.log('question/post created');
      User.findOneAndUpdate({ _id: decoded._id}, {$push: {postId: post._id}}, {new: true, safe: true, upsert: true}, (err, user) => {
        if(err) {
          res.json({error: err, success: false});
        } else {
          res.json({post: post, success: true, msg: `user ${decoded.username} now has post(question) with id: ${post._id}`});
        }
      })
    }
  })
}

methods.createAnswer = (req, res, next) => {
  let decoded = helperTo.decode(req.headers.token);
  let postId = req.params.postId;
  Post.findOne({ _id: postId}, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      post.answers.push({
        userId: decoded._id,
        content: req.body.content
      })
      post.save((err) => {
        if(err) {
          res.json({error: err, success: false});
        } else {
          console.log(`successfully create answer`)
          res.json({success: true, msg: `answer for question with id ${post._id} has been created`});
        }
      })
    }
  })
}

methods.voteAnswer = (req, res, next) => {
  let decoded = helperTo(req.headers.token);
  let postId = req.params.postId;
  Post.findById(postId, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      let answer = post.answers.id(req.params.answerId);
      if(answer.votes.some((vote) => {return vote.userId == decoded._id})) {
        res.json({msg: 'you already voted'});
        console.log('you already voted');
      } else {
        Post.findOneAndUpdate({ _id: postId, 'answers._id': req.params.answerId },
          {$push: {'answers.$.votes': {user: decoded._id, count: req.body.count} }},
          {new: true}, (err, result) => {
            if(err) {
              res.json({error: err, success: false});
            } else {
              res.json({result: result, success: true});
            }
          })
      }
    }
  })
}



methods.getAll = (req, res, next) => {
  Post.find({}, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({post: post, success: true, msg: 'successfully getting all posts data'});
    }
  })
}

methods.delete = (req, res, next) => {
  let postId = req.params.postId;
  Post.findByIdAndRemove(postId, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      console.log('post deleted');
      User.findOneAndUpdate({ _id: post.userId }, {$pullAll: {postId: post._id}}, (err, user) => {
        if(err) {
          res.json({error: err, success: false});
        } else {
          res.json({post: post, user: user, success: true, msg: 'successfully delete post'});
        }
      })
    }
  })
}

module.exports = methods;