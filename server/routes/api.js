var express = require('express');
var router = express.Router();

//models

var Users = require('../models/users');

/* GET api listing. */
Users.methods(['get', 'put', 'post', 'delete']);
Users.register(router, '/users');

module.exports = router;
