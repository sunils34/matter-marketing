var env = process.env.NODE_ENV || 'development';

//load dev vars from local config
if(env == 'development') {
  require('dotenv').config();
}

var express = require('express');
var controller = require('./lib/controller');
var app = express();

//Enable public static file access
app.use(express.static('public'))
app.post('/apply', controller.apply);

app.listen(3234);
console.log('Running on port 3234')
