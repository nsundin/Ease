var mongoose = require('mongoose');

exports.create = function(req, res) {
	req.body.name = req.params.item;
	res.locals.content.inventory.push(req.body);
	company.save(function(err, location) {
	  if (err) {
			console.log('Error saving Location.', err);
		}
		else {
			console.log('Saving:\n', location);
 		}
	});
	res.send('ok');
};
