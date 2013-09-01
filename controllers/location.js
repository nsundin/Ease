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


exports.createItem = function (req, res, next) {
	var inventory = res.locals.content;
	console.log(inventory);
	//check for duplicate sku
	var items = inventory.items.toObject();
	for (i in items) {
		if(items[i].sku == req.params.itemSku) {
			console.log('duplicate found');
			return res.status(406).send('Duplicate');
		}
	}
	//update sku
	req.body.sku = req.params.itemSku;
  inventory.items.push(req.body);
	console.log(inventory);

	inventory.save(function (err, inventory) {
		if (err) {
			console.log('error occurred', err);
			res.status(406).send();
		}
		else {
			console.log('saved: \n' + inventory);
			res.send('Saving complete');
		}
	});

};
exports.deleteItem = function (req, res, next) {
	var inventory = res.locals.content;
/*	for (f in inventory.items) {
		console.log(f);
	}*/
	var items = inventory.items.toObject();
	for (i in items) {
		if (inventory.items[i].sku == req.params.itemSku) {
			var item = inventory.items[i];
			console.log('item found: ', item);
		}
	}
 	inventory.items.remove(item);
	res.send(inventory.items);
	inventory.save(function (err, inventory) {
		if (err) {
			console.log('error occurred', err);
			res.status(406).send();
		}
		else {
			console.log('saved: \n' + inventory);
			res.send('Saving complete');
		}
	});
}



