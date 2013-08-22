var mongoose = require('mongoose');
var  = require('../models/item').Item;

exports.create = function(req, res) {
	var username = req.user.username; 
	var itemInst = new Item(req.body);
	console.log(req);
	itemInst.save(function(err, item) { //does not work
		//console.log('Saving:\n'+item);
		if (err) {
			console.log('Error saving Item.');
		};
	});
	res.send('Ok');
};
