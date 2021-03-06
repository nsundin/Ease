var mongoose = require('mongoose'),
	locationSchema = require('./company_resources/location').locationSchema;

var companySchema = new mongoose.Schema({
	locations: [locationSchema],
	name: String,
	companyId: Number
});

mongoose.model('Company', companySchema);

