//https://github.com/saintedlama/passport-local-mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose'),
	companyModel = mongoose.model('company'),
	locationModel = mongoose.model('location'),
	contact = mongoose.model('Contact');


var userSchema = new Schema({
	uid: Number,
	company: companyModel,
	name: String,
	location: locationModel,
	contactInformation: contact
	
	
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

