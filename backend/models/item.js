var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    sku: Number,
    name: String,
    quantity: Number,
    purchasePrice: Number,
    salesPrice: Number});

exports.Item = mongoose.model('Item', itemSchema);

