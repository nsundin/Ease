var mongoose = require('mongoose'),
	inventorySchema = require('./inventory').inventorySchema;

var locationSchema = new mongoose.Schema({
	inventory: [inventorySchema],
	name: String,
	address: String,
	locationId: Number
});

exports.locationSchema = locationSchema;
