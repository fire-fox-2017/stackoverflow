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
          res.json({question: post, success: true, msg: `user ${decoded.username} now has question with id: ${post._id}`});
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

methods.voteQuestion = (req, res, next) => {
  let decoded = helperTo.decode(req.headers.token);
  let postId = req.params.postId;
  Post.findById(postId, (err, post) => {
    if(err) {
      res.json({error: err, success: true});
    } else {
      if(post.votes.some(vote => vote.userId == decoded._id)) {
        console.log('you can only vote once!');
        res.status(403).send({msg: 'you can only vote once', success: false});
      } else {
        Post.findOneAndUpdate({ _id: post._id }, {$push: {votes: {count: req.body.count, userId: decoded._id}}}, {new: true}, (err, post) => {
          if(err) {
            res.json({error: err, success: false});
          } else {
            res.json({question: post, success: true});
          }
        })
      }
    }
  })
}

methods.voteAnswer = (req, res, next) => {
  let decoded = helperTo.decode(req.headers.token);
  let postId = req.params.postId;
  Post.findById(postId, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      console.log('masuk vote answer');
      // let index = post.answers.findIndex(val => val._id == req.params.answerId);
      // let voted = post.answers[index].votes.some(val => val.userId == decoded._id);
      // [index].votes.some(val => val.userId == decoded._id);
      // console.log(index)
      // res.send(post)
      let answer = post.answers.id(req.params.answerId);
      if(answer.votes.some((vote)=> {return vote.user == decoded.id})) {
        res.json({msg: 'you already voted', success: false});
        console.log('you already voted');
        // res.json({ validated: false })
      } else {
        Post.findOneAndUpdate({ _id: postId, 'answers._id': req.params.answerId },
          {$push: {'answers.$.votes': {userId: decoded._id, count: req.body.count} }},
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

methods.getAllQuestionWithUserId = (req, res, next) => {
  Post.find({}).populate('userId')
  .exec((err, questions) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({questions: questions, success: true});
    }
  })
}

methods.getOneQuestion = (req, res, next) => {
  postId = req.params.postId;
  Post.findOne({ _id: postId })
  .populate('userId answers.userId')
  .exec((err, question) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({question: question, success: true});
    }
  })
}

methods.getAllQuestion = (req, res, next) => {
  Post.find({}, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({questions: post, success: true, msg: 'successfully getting all posts data'});
    }
  })
}

methods.deleteQuestion = (req, res, next) => { // masih belum jalan delete dari postId model user
  let postId = req.params.postId;
  Post.findByIdAndRemove(postId, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      console.log('post deleted');
      User.update({ _id: post.userId }, {$pullAll: [{postId: post._id}] }).exec((err, result) => {
        if(err) {
          res.json({error: err, success: false});
        } else {
          res.json({result: result, success:true});
        }
      })
      //   , (err, user) => {
      //   if(err) {
      //     res.json({error: err, success: false});
      //   } else {
      //     res.json({post: post, user: user, success: true, msg: 'successfully delete post'});
      //   }
      // })
    }
  })
}

methods.deleteAnswer = (req, res, next) => {
  let postId = req.params.postId;
  Post.findById(postId, (err, post) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      post.answers.id(req.params.answerId).remove();
      post.save((err) => {
        if(err) {
          res.json({error: err, success: false});
        } else {
          console.log('answer deleted');
          res.json({post: post, success: true});
        }
      })
    }
  })
}

module.exports = methods;