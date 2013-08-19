//https://github.com/saintedlama/passport-local-mongoose
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({uid:Number});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

