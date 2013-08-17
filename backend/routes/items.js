var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    sku: Number,
    name: String,
    quantity: Number,
    purchasePrice: Number,
    salesPrice: Number});

var Item = mongoose.model('Item', itemSchema);

exports.postItems = function(req, res) {
    var itemInst = new Item(req.body);
    console.log(req);
    itemInst.save(function(err, item) {
        console.log(item);
        if (err) {
            console.log("Error!")
        }; //Todo handle error
        console.log("Saved Item.");
    });
    res.send("GOT IT!");
};

exports.items = function(req, res) {
    Item.find(function(err, items) {
        if (err) {}; //handle error
        res.send(items)
    });
};

