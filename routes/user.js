var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res, next) {
	res.send('User Route');
});
module.exports = router;
