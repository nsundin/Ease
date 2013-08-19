var mongoose = require('mongoose');
var Item = mongoose.model('Item');
//var Item = require('../models/item').Item;

exports.postItems = function(req, res) {
    var itemInst = new Item(req.body);
    console.log(req);
    itemInst.save(function(err, item) {
        //console.log('Saving:\n'+item);
        if (err) {
            console.log('Error saving Item.');
        };
    });
    res.send('Ok');
};

exports.getItems = function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            console.log('Error getting Item')
        };
        res.send(items)
    });
};

