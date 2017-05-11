const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stackoverflow');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;