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
	Company.find({name: req.params.company}, function(err, company) {
		if (err) {
			console.log('Error getting Company', err);
			return res.status(404).send('[]');
		}
		else {
			console.log('company', company[0].locations);
			var location_object = company[0].locations.toObject();
			for (loc_index in location_object) {
				console.log(location_object[loc_index]);
				if (location_object[loc_index].name == req.params.location) {
					return res.send(location_object[loc_index]);
				}
			}
			console.log('Error getting Company');
			return res.status(404).send('[]');
		}
	});
};
