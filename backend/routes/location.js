var mongoose = require('mongoose');
//model
var Company = mongoose.model('Company');
var Inventory = mongoose.model('Inventory');

exports.post = function(req, res) {
		var company = res.locals.content;
		//test for duplicates - gross
		var locationObject = company.toObject();
		for (i in locationObject) {
			if (locationObject[i].name == req.params.location.name) {
				//throw shitfit
				console.log('Error saving Location.');
				return res.status(406).send('Duplicate');
			}
		}
		company.locations.push({name: req.params.location});
		company.save(function(err, location) {
			if (err) {
				console.log('Error saving Location.', err);
				return res.send(err);
			}
			else {
				console.log('Saving:\n'+location);
			}
		});
	res.send('ok');
};

//company.get should be called before this
exports.get = function(req, res, next) {
		//optimize by not evaluating entire thing to JSON
		var location_object = res.locals.content.locations.toObject();
		//do linear search for location
		for (loc_index in location_object) {
			if (location_object[loc_index].name == req.params.location) {
				//use locations.id(id) here instead
				res.locals.content = res.locals.content.locations[loc_index];
				return next();
			}
		}
		res.status(404).send('location not found');
};
