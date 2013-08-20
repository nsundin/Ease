var mongoose = require('mongoose');
var alarmSchema = require('../alarm').alarmSchema;

var itemSchema = new mongoose.Schema({
	sku: Number,
	name: String,
	quantity: Number,
	purchasePrice: Number,
	salesPrice: Number,
	alarm: [alarmSchema]

});

exports.itemSchema = itemSchema;
