var stormpath = require('express-stormpath');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var twilio = require('twilio')('AC8718bda9e1f370a5f7336fdc267e7076','1631bbf712e8dc8e46945056008e821e');
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

var Advert = require('./models/advert');
var Parcel = require('./models/parcel');
var List = require('./models/list');
var ErrorHandling = require('./models/errorhandling');

var advert = require('./routes/api/advert');
var parcel = require('./routes/api/parcel');
var index_routes = require('./routes/index');
var auth_routes = require('./routes/auth');

var app = express();

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

app.use('/', index_routes);
app.use('/api', api);
app.use('/api/parcel', parcel);
app.use('/api/advert', advert);
app.use(stormpath.init (app,
    {
    web: {
        spa: {
            enabled: true,
            view: path.join(__dirname, 'public', 'home.ejs')
        }
    },

    website: true,
	enableFacebook: true,
	social: {
		facebook: {
		appId: '464009947131641',
		appSecret: '25c855418e9e8231a4280b6b6c9e808f',
				  },
			},
	enableGoogle: true,
	social: {
			google: {
			clientId: '33890120723-9vq5q0pmkkqo5dn3dmotrvjkg63sfb2r.apps.googleusercontent.com',
			clientSecret: 'mlXyZmFr4e-QQPxL8-BOp5XT',
					},
			},
  application: {
    href: 'https://api.stormpath.com/v1/applications/3tVN21kmhuU54q1eR7n0GX'
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



/*
Old API details


apiKey.id = 55RE4LAXD93VTGA5HNMVWMTNO
apiKey.secret = E/l0g+QJqB5txN5+iJFDVIObz4vCIPu6hkIqbAeDlvY



4JO290RITZWCEVEA0Y3QJ267D
9L/BeHebEIIjuZxyKAsmp3q0BlVNNe1watG2aKveN8Y*/