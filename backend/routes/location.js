var mongoose = require('mongoose');
//model
var Company = mongoose.model('Company');

exports.post = function(req, res) {
		var company = res.locals.content;
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
	res.send('ok');
};

//company.get should be called before this
exports.get = function(req, res, next) {
		//optimize by not evaluating entire thing to JSON
		var location_object = res.locals.content.locations.toObject();
		//do linear search for location
		for (loc_index in location_object) {
			if (location_object[loc_index].name == req.params.location) {
				res.locals.content = location_object[loc_index];
				return next();
			}
		}
		res.status(404).send('location not found');
};
