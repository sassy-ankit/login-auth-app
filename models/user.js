var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
