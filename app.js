//Application Variables
var COOKIE_HASH = '542b2b53a44a9fdc3cedc1fc4d480e18';

/**
 * Module dependencies.
 */
// Models
require('./models/user');
require('./models/company');

// Routes
var session = require('./controllers/session');

// Modules
var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var http = require('http');
var path = require('path');
var mongoStore = require('connect-mongo')(express);
var LocalStrategy = require('passport-local').Strategy;
var app = express();


//Connect to Mongo
var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/test';
mongoose.connect(mongoUri);


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '/static')));

// Session Cookies
app.use(express.cookieParser(COOKIE_HASH));

app.use(express.session({
		store : new mongoStore({
			url : mongoUri
		}),
		maxAge: 300000,
		secret: COOKIE_HASH
	})
);

// Turn on Passport
app.use(passport.initialize());
app.use(passport.session());

// Config Passport
var User = mongoose.model('User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// add stuff to get /company/location/inventory/item
// possibly move to another file

//this must be here or usernames don't work
require('./routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
