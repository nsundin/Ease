var mongoose = require('mongoose');
var Company = mongoose.model('Company');


exports.get = function(req, res, next) {
	if (!req.isAuthenticated() || (req.user.username != req.params.company)) {
		res.status(403).send('Error: Not Authenticated');
		return;
	}
	Company.findOne({name: req.params.company}, function(err, company) {
		if (err) {
			console.log('Error getting Company', err);
			res.send('db error');
		}	
		else {
			if (company) {
				res.locals.content = company;
				next();
			}
			else {
				res.status(404).send('company not found');
			}
		}
	});
};

exports.deleteLocation = function (req, res, next) {
	var company = res.locals.content;
	var locations = company.locations.toObject();
	for (i in locations) {
		if (company.locations[i].name == req.params.location) {
			var location = company.locations[i];
			console.log('location found: ', location);
		}
	}
 	company.locations.remove(location);
	res.send(company.locations);
	company.save(function (err, company) {
		if (err) {
			console.log('error occurred', err);
			res.status(406).send();
		}
		else {
			console.log('saved: \n' + company);
			res.send('Saving complete');
		}
	});
};
