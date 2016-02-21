var stormpath = require('express-stormpath');
var passport = require('passport');
var StormpathStrategy = require('passport-stormpath');
var session = require('express-session');
var flash = require('connect-flash');
var twilio = require('twilio')('AC8718bda9e1f370a5f7336fdc267e7076','1631bbf712e8dc8e46945056008e821e')

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/api');
var mongoose = require('mongoose');


mongoose.connect('mongodb://martin:passtheparcelapppassword@ds027505.mongolab.com:27505/parcelapp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});  


var User = require('./models/user');
var Parcel = require('./models/parcel');
var List = require('./models/list');
var Advert = require('./models/advert');
var ErrorHandling = require('./models/errorhandling');

var advert = require('./routes/api/advert');
var category = require('./routes/api/category');
var parcel = require('./routes/api/parcel');
var provider = require('./routes/api/provider');
var user = require('./routes/api/user');
var index_routes = require('./routes/index');
var auth_routes = require('./routes/auth');


var app = express();

//stormpath setup



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/api/user', user);
app.use('/api/provider', provider);
app.use('/api/parcel', parcel);
app.use('/api/category', category);
app.use('/api/advert', advert);

//more stormpath

app.use(stormpath.init(app, {
	client: {
		apiKey: {
			id: '4JO290RITZWCEVEA0Y3QJ267D',
			secret: '9L/BeHebEIIjuZxyKAsmp3q0BlVNNe1watG2aKveN8Y'
		}
	},
	application: {
		href: 'https://api.stormpath.com/v1/applications/7UCamjLdlCqofWRB3jvGZC'
	}
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
