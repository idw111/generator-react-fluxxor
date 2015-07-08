'use strict';

var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis')(session);
var config = require('./config');
var redis = require('redis').createClient(config.redis.port, config.redis.host);
var less = require('less-middleware');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	secret: '<%= appName %>',
	maxAge: 1000 * 60 * 60 * 24 * 30,
	store: new RedisStore({host: config.redis.host, port: config.redis.port, client: redis}),
	resave: true, 
	saveUninitialized: true
}));

app.use(less(path.join(__dirname, 'client'), {
	dest: path.join(__dirname, 'public'),
	compiler: {sourceMap: true}
}));
app.use(express.static(path.join(__dirname, 'public')));

<% if (usePassport) { %>
// passport
var passport = require('./passport');
app.use(passport.initialize());
app.use(passport.session());
<% } %>

// router
app.use('/', require('./routes/router'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use(require('./routes/error/reporter'));
app.use(require('./routes/error/renderer'));
process.on('uncaughtException', require('./routes/error/uncaught'));

module.exports = app;
