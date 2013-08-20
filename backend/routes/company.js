var mongoose = require('mongoose');
var Company = mongoose.model('Company');

exports.postCompanies = function(req, res) {
	var username = req.user.username; 
	var companyInst = new Company(req.body);
	console.log(req);
	companyInst.save(function(err, company) { //does not work
		//console.log('Saving:\n'+company);
		if (err) {
			console.log('Error saving Company.', err);
		};
	});
	res.send('Ok');
};

exports.getCompanies = function(req, res) {
	var username = req.user.username; 
	Company.find(function(err, companies) {
		if (err) {
			console.log('Error getting Company', err)
		};
		res.send(companies)
	});
};

