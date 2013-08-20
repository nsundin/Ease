var mongoose = require('mongoose');
var Company = mongoose.model('Company');

exports.post = function(req, res) {
	Company.findOne({name: req.params.company}, function(err, company) {
		company.locations.push({name: req.params.location});
		console.log(req);
		company.save(function(err, location) {
			console.log(company);
			if (err) {
				console.log('Error saving Location.', err);
			}
			else {
				console.log('Saving:\n'+location);
			}
		});
	});
	res.send('Ok');
};

exports.get = function(req, res) {
	Location.find({name: req.params.location}, function(err, locations) {
		if (err) {
			console.log('Error getting Location', err)
		}
		res.send(locations)
	});
};
