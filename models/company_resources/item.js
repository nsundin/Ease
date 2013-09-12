var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	sku: Number,
	name: String,
	units: String,
	category: String,
	description: {type: String, default: ''},
	quantity: {type: Number, default: 0},
	purchasePrice: Number,
	salesPrice: Number,
	hasAlarm: {type:  Boolean, default: false },
	minQuantity: Number,
	isDanger: Boolean


});

exports.itemSchema = itemSchema;
