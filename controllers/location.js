var mongoose = require('mongoose');
//model
var Company = mongoose.model('Company');
var Inventory = mongoose.model('Inventory');

exports.post = function(req, res) {
	var company = res.locals.content;
	//test for duplicates - gross
	var locationObject = company.locations.toObject();
	for (i in locationObject) {
		if (locationObject[i].name == req.params.location) {
			console.log('Duplicate');
			console.log(locationObject[i].name);
			return res.status(406).send('Duplicate');
		}
	}
	var inventoryInst = new Inventory({});
	inventoryInst.save(function(err, inventory) {
		if (err) {
			console.log('Error saving Inventory.', err);
			return res.status(406).send(err);
		}
		else {
			company.locations.push({name: req.params.location, inventory: inventory._id});
			company.save(function(err, location) {
				if (err) {
					console.log('Error saving Location.', err);
					return res.send(err);
				}
				else {
					console.log('Saving:\n'+location);
				}
			});
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

exports.getInventory = function(req, res, next) {
	var location = res.locals.content;
	Inventory.findOne({_id: location.inventory}, function (err, inventory) {
		if (err) {
				console.log('Error finding inventory');
				res.status(404).send(err);
		}
		else {
			if (inventory) {
				res.locals.content = inventory;
				next();
			}
			else {
				console.log('Error finding inventory');
				res.status(404).send(err);
			}
		}
	});
	
};
