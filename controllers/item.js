var mongoose = require('mongoose');
var Inventory = mongoose.model('Inventory');
var merge = require('./../nasty_hacks').merge;


exports.create = function (req, res, next) {
	var inventory = res.locals.content;
	console.log(inventory);
	//check for duplicate sku
	var items = inventory.items.toObject();
	for (var i in items) {
		if(items[i].sku == req.params.itemSku) {
			console.log('duplicate found');
			return res.status(406).send('Duplicate');
		}
	}
	//update sku
	req.body.sku = req.params.itemSku;
	req.body._id = req.params.itemSku;
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
var getItem = function(inventory, query) {
	var items = inventory.items.toObject();
	var item;
	for (var i in items) {
		if (inventory.items[i].sku == query){
			item = inventory.items[i];
			console.log('item found: ', item);
		}
	}
	return item;
};

exports.delete = function (req, res, next) {
	var inventory = res.locals.content;
	var item = getItem(inventory, req.params.itemSku).toObject();
	inventory.items.remove(item);
	inventory.save(function (err, inventory) {
		if (err) {
			console.log('error occurred', err);
			res.status(406).send();
		}
		else {
			console.log('saved: \n' + inventory);
			res.send('Deleting complete');
		}
	});
};


exports.update = function (req, res, next) {
	var inventory = res.locals.content;
	var item = getItem(inventory, req.params.itemSku);
	merge(item, req.body);
	inventory.save(function (err, inventory) {
		if (err) {
			console.log('error occurred', err);
			res.status(406).send();
		}
		else {
			console.log('saved: \n' + inventory);
			res.send('inventory updated');
		}
	});
};
