var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.post('/', function(req, res, next) {
	var message = new Message({
		content: req.body.content
	});
	message.save(function(err, result) {
		if (err) {
			return res.status(500).json({
				title: 'An error occured while saving message',
				error: err
			});
		}
		res.status(200).json({
			title: 'Message saved successfully',
			obj: result
		});
	});
});

module.exports = router;
