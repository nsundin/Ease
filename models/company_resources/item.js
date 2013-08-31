var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	sku: Number,
	name: String,
	quantity: Number,
	purchasePrice: Number,
	salesPrice: Number,
	hasAlarm: Boolean,
	minQuantity: Number,
	isDanger: Boolean


});

exports.itemSchema = itemSchema;
