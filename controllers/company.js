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
