var mongoose = require('mongoose');
var Company = mongoose.model('Company');

exports.post = function(req, res) {
	var companyInst = new Company({name: req.params.company});
	console.log(req);
	companyInst.save(function(err, company) { //does not work
		if (err) {
			console.log('Error saving Company.', err);
		}
		else {
			console.log('Saving:\n'+company);
		}
	});
	res.send('Ok');
};

exports.get = function(req, res) {
	//var username = req.user.username; 
	Company.find({name: req.params.company}, function(err, companies) {
		if (err) {
			console.log('Error getting Company', err)
		}
		res.send(companies)
	});
};

