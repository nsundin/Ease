var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var _ = require('underscore');


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
	var location = _.find(company.locations, function (location) {
		return location.name == req.params.location;
	});
	if (!location) {
		console.log('error occurred', err);
		res.status(406).send();
	}
	company.locations.remove(location);
	console.log('location found: ', location);
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

exports.updateLocation = function (req, res, next) {
	var company = res.locals.content;
	var location = _.find(company.locations, function(location) {
		return location.name == req.params.location;
	});
	if (!location) {
		console.log('Error City;');
		return res.status(404).send();
	}
	_.extend(location, req.body);
	company.save(function (err, company) {
		if (err) {
			console.log('error occurred', err);
			res.status(406).send();
		}
		else {
			console.log('Updated: \n' + company);
			res.send('Updating complete');
		}
	});
			
};

/* We're not going to update the entire company
 * because that might fuck all our shit
 */
