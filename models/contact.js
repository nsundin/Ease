var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
	phone: String, 
	email: String, 
	address: String, 
});

mongoose.model('Contact', contactSchema);
