var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/signup', function(req, res, next) {
	var user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: bcrypt.hashSync(req.body.password, 10),
		email: req.body.email
	});
	user.save(function(err, result) {
		if (err) {
			console.log(err);

			return res.status(500).json({
				title: 'An internal error occured while registering user',
				error: err
			});
		}
		res.status(201).json({
			title: 'User registered successfully',
			obj: result
		});
	});
});

router.post('/signin', function(req, res, next) {
	User.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			return res.status(500).json({
				title: 'An internal error occured while registering user',
				error: err
			});
		}
		if (!user) {
			return res.status(401).json({
				title: 'Login Failed',
				error: {
					message: 'Email is not registered, kindly SIGNUP first'
				}
			});
		}
		if (!bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(401).json({
				title: 'Login Failed',
				error: {
					message: 'Wrong Password'
				}
			});
		}
		var jwttoken = jwt.sign({ user: user }, 'secretKey', { expiresIn: '2d' });
		res.status(201).json({
			title: 'Successfully logged in',
			token: jwttoken,
			userId: user._id
		});
	});
});

module.exports = router;
