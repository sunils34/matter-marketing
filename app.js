var env = process.env.NODE_ENV || 'development';

//load dev vars from local config
if(env == 'development') {
  require('dotenv').config();
}

var bugsnag = require("bugsnag");
if(process.env.BUGSNAG_KEY) {
  bugsnag.register(process.env.BUGSNAG_KEY);
}



var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')

var express = require('express');
var controller = require('./lib/controller');

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
var { errorHandler, notFoundHandler } = require('./lib/middleware/errors')

var app = express();
app.locals.env = env;
app.use(require('morgan')('common'));


// middleware init
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))
app.use(errorHandler)

// setup package details
app.locals.version = require('./package.json').version

// setup templating
app.set('views', __dirname + '/lib/views');
app.engine('html', require('ejs').renderFile);

// Enable public static file access
app.use(express.static('public'))


// Routes
app.get('/', controller.index);
app.post('/start', parseForm, csrfProtection, controller.start);
app.get('/start',csrfProtection, controller.start);
app.get('/signin', function(req, res) {
  res.redirect(301, 'https://app.' + process.env.BASE_DOMAIN + '/signin');
});

app.use(notFoundHandler);

app.listen(process.env.PORT || 3234);
