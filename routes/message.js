var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.post('/', function(req, res, next) {
	var message = new Message({
		content: req.body.content
	});
	console.log(message.content);

	message.save(function(err, result) {
		if (err) {
			return res.status(500).json({
				title: 'An internal error occured while saving message',
				error: err
			});
		}
		res.status(200).json({
			title: 'Message saved successfully',
			obj: result
		});
	});
});

router.get('/', function(req, res, next) {
	Message.find().exec(function(err, messages) {
		if (err) {
			return res.status(500).json({
				title: 'An internal error occured while saving message',
				error: err
			});
		}
		res.status(200).json({
			title: 'Message retrived successfully',
			obj: messages
		});
	});
});

module.exports = router;
