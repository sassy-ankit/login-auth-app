var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');

router.post('/', function(req, res, next) {
	console.log(req.body);

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
module.exports = router;
