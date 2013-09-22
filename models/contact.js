var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
	phone: String, 
	email: String, 
	address: String, 
});

exports.contactSchema = contactSchema;
mongoose.model('Contact', contactSchema);
