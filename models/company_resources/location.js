var mongoose = require('mongoose'),
	inventorySchema = require('./inventory').inventorySchema;

var locationSchema = new mongoose.Schema({
	inventory: String , //_id of inventory model
	name: String,
	address: String,
	locationId: Number
});

exports.locationSchema = locationSchema;
