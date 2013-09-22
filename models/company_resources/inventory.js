var mongoose = require('mongoose'),
		itemSchema = require('./item').itemSchema;

var inventorySchema = new mongoose.Schema({
	items: [itemSchema],
	itemsOutOfStock: Number,
	totalItems: Number,
	name: String
});

mongoose.model('Inventory', inventorySchema);
