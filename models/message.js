var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

var msgSchema = new mongoose.Schema({
	content: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Message', msgSchema);
