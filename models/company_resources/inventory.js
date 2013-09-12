var mongoose = require('mongoose'),
		itemSchema = require('./item').itemSchema;

var inventorySchema = new mongoose.Schema({
	items: [itemSchema],
	name: String
});

mongoose.model('Inventory', inventorySchema);
