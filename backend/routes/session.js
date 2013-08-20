var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.postLogin = function(req, res) {
	res.send('Ok');
};

exports.postLogout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.postRegister = function(req, res) {
	//verify password with confirm on client side
	userInstance = new User({
		username: req.body.username
	});
	User.register(userInstance, req.body.password, function(err, user) {
		if (err) {
			console.log('User could not be registered: '+err);
			res.send('Error');
		}
		else {
			res.redirect('/');
		}
	});
};

exports.auth = function(req, res, next) {
	if (req.isAuthenticated() && (req.user.username != req.params.company)) {
		next();
	}
	else {
		res.status(403).send('Error: Not Authenticated');
	}
};

