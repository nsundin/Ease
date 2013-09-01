var mongoose = require('mongoose');
var User = mongoose.model('User');
var Company = mongoose.model('Company');

exports.postLogin = function(req, res) {
	res.send('You are now logged in');
};

exports.postLogout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.postRegister = function(req, res) {
	//verify password with confirm on client side
	var new_username = req.body.username;
	userInstance = new User({
		username: new_username
	});
	User.register(userInstance, req.body.password, function(err, user) {
		if (err) {
			console.log('User could not be registered: ', err);
			res.send('Error');
		}
		else {
			res.redirect('/');
		}
	});
	//for now make a company the name of the user
	var companyInst = new Company({name: new_username});
	companyInst.save(function(err, company) {
		if (err) {
			console.log('Error saving Company.', err);
		}
		else {
	  	console.log('Saving:\n'+company);
  	}
	});
};

