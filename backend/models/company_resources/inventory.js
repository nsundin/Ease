var mongoose = require('mongoose'),
		itemSchema = require('./item').itemSchema;

var inventorySchema = new mongoose.Schema({
	items: [itemSchema],
  name: String
});

exports.inventorySchema = inventorySchema;
