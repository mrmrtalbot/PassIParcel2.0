var express = require('express');
var router = express.Router();

//models

var Users = require('../models/user');
var Parcels = require('../models/parcel')
var Adverts = require('../models/advert')

/* GET api listing. */
Users.methods(['get', 'put', 'post', 'delete']);
Users.register(router, '/users');

Parcels.methods(['get', 'put', 'post', 'delete']);
Parcels.register(router, '/parcels');

Adverts.methods(['get', 'put', 'post', 'delete']);
Adverts.register(router, '/parcels');

module.exports = router;
