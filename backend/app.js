//Application Variables
var COOKIE_HASH = '542b2b53a44a9fdc3cedc1fc4d480e18';
var DB_ADDRESS = 'mongodb://localhost/test';

/**
 * Module dependencies.
 */
// Models
require('./models/user');
require('./models/item');

// Routes
var items = require('./routes/items');
var session = require('./routes/session');

// Modules
var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var http = require('http');
var path = require('path');
var mongoStore = require('connect-mongo')(express)
var LocalStrategy = require('passport-local').Strategy;

var app = express();

//Connect to Mongo
mongoose.connect(DB_ADDRESS);

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '../client')));

// Session Cookies
app.use(express.cookieParser(COOKIE_HASH));

app.use(express.session({
    store : new mongoStore({
      url : DB_ADDRESS
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

app.get('/items', session.auth, items.getItems);
app.post('/items', session.auth, items.postItems);
app.post('/logout', session.postLogout);
app.post('/login', passport.authenticate('local'), session.postLogin);
app.post('/register', session.postRegister);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
