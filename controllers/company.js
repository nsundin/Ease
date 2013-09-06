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
	for (var i in locations) {
		if (company.locations[i].name == req.params.location) {
			var location = company.locations[i];
			company.locations.remove(location);
			console.log('location found: ', location);
		}
	}
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

exports.update = function (req, res, next) {
	var company = res.locals.content;
	console.log('company: ', company);
	console.log('body: ', req.body);
	console.log('name: ', company.name);
	var query = Company.findOne({_id: company._id});
	company.update(query, {$set: {name: 'petshop'}}, function(err, company) {
		if (err) {
			console.log('Error in updating: ', err);
			res.send('Saving Error');
		} 
		else {
			console.log('company: ', company);
			res.send('Successfully updated ' +  company.name);
		}
	});
};
