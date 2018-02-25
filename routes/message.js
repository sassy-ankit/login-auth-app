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
		res.status(201).json({
			title: 'Message retrived successfully',
			obj: messages
		});
	});
});

router.patch('/:id', function(req, res, next) {
	Message.findById(req.params.id, function(err, message) {
		if (err) {
			return res.status(500).json({
				title: 'An internal error occured while udpating message',
				error: err
			});
		}
		if (!message) {
			return res.status(500).json({
				title: 'Opps! Something went wrong. No message found',
				error: { message: 'Message not found' }
			});
		}
		message.content = req.body.content;
		message.save(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An internal error occured while saving message',
					error: err
				});
			}
			res.status(200).json({
				message: 'Message updated successfully',
				obj: result
			});
		});
	});
});
router.delete('/:id', function(req, res, next) {
	Message.findById(req.params.id, function(err, message) {
		if (err) {
			return res.status(500).json({
				title: 'An internal error occured while deleting message',
				error: err
			});
		}
		if (!message) {
			return res.status(500).json({
				title: 'Opps! Something went wrong. No message found',
				error: { message: 'Message not found' }
			});
		}
		message.remove(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An internal error occured while saving message',
					error: err
				});
			}
			res.status(200).json({
				message: 'Message deleted successfully',
				obj: result
			});
		});
	});
});

module.exports = router;
