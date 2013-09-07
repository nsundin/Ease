var mongoose = require('mongoose');
var Inventory = mongoose.model('Inventory');
var _ = require('underscore');

exports.create = function (req, res, next) {
	var inventory = res.locals.content;
	console.log(inventory);
	//check for duplicate sku
	var item = _.find(inventory.items, function(item) {
		return item.sku == req.params.itemSku;
	});
	if (item) {
		console.log('duplicate found');
		return res.status(406).send('Duplicate');
	}
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

exports.delete = function (req, res, next) {
	var inventory = res.locals.content;
	var item = _.find(inventory.items, function(item) {
		return item.sku == req.params.itemSku; 
	});
	if (!item) {
		return res.status(404).send('item not found');
	}

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
	var item = _.find(inventory.items, function(item) {
		return item.sku == req.params.itemSku;
	});
	_.extend(item, req.body);
	inventory.save(function (err, inventory) {
		if (err) {
			console.log('error occurred', err);
			res.status(406).send();
		}
		else {
			console.log('saved: \n' + inventory);
			res.send('Inventory updated');
		}
	});
};
