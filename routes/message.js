var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Message = require('../models/message');
var User = require('../models/user');

router.get('/', function (req, res, next) {
	Message.find().exec(function (err, messages) {
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

router.use('/', function (req, res, next) {
	jwt.verify(req.query.token, 'secretKey', function (err, decoded) {
		if (err) {
			return res.status(401).json({
				title: 'Not authenticated',
				error: err
			});
		}
		next();
	});
});

router.post('/', function (req, res, next) {
	var decoded = jwt.decode(req.query.token);
	User.findById(decoded.user._id, function (err, user) {
		if (err) {
			return res.status(500).json({
				title: 'An internal error occured while saving message',
				error: err
			});
		}

		var message = new Message({
			content: req.body.content,
			user: user
		});
		message.save(function (err, result) {
			console.log(result);			// #### TO BE DELETED ####

			if (err) {
				return res.status(500).json({
					title: 'An internal error occured while saving message',
					error: err
				});
			}
			//console.log(user.messages.push(mongoose.Types.ObjectId(result._id)));
			user.messages.push(mongoose.Types.ObjectId(result._id));
			user.save();
			res.status(201).json({
				title: 'Message saved successfully',
				obj: result
			});
		});
	});
});

router.patch('/:id', function (req, res, next) {
	Message.findById(req.params.id, function (err, message) {
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
		message.save(function (err, result) {
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
router.delete('/:id', function (req, res, next) {
	Message.findById(req.params.id, function (err, message) {
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
		message.remove(function (err, result) {
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
