var env = process.env.NODE_ENV || 'development';

//load dev vars from local config
if(env == 'development') {
  require('dotenv').config();
}

var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')

var express = require('express');
var controller = require('./lib/controller');

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
var { errorHandler } = require('./lib/errors')

var app = express();

// middleware init
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))
app.use(errorHandler)

// Enable public static file access
app.use(express.static('public'))
app.post('/apply', parseForm, csrfProtection, controller.apply);

app.listen(3234);
console.log('Running on port 3234')
