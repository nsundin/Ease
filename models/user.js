//https://github.com/saintedlama/passport-local-mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose'),
	contact = require('./contact.js').contactSchema;


var userSchema = new Schema({
	uid: Number,
	companyId: String,
	name: String,
	locationId: String,
	contactInformation: [contact]
	
	
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

