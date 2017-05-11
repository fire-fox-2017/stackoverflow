const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/stackoverflow');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('-+- Mongo Database Connection established -+-');
})

//passport
const userController = require('./controllers/user');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

passport.use(new Strategy(userController.signin));

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// routes
const api = require('./routes/api');

// use the routes
app.use('/api', api);

app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

/* catch 404 and forward to error handler */
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;