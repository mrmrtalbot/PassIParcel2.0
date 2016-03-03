var express = require('express');
var router = express.Router();

//models
var Adverts = require('../models/advert');
var Parcels = require('../models/parcel');
var Errors = require('../models/errorhandling');
var Information = require('../models/errorhandling');

/* GET api listing. */

Parcels.methods(['get', 'put', 'post', 'delete']);
Parcels.register(router, '/api/parcel');

Adverts.methods(['get', 'put', 'post', 'delete']);
Adverts.register(router, '/api/advert');

router.get('/', function(req, res, next) {
    res.send({'api version': '1.0', 'teamMembers':['Martin Talbot', 'Matthew West'], 'message':'Please Refer to the API documentation http://www.Placeholder.com/documentation/ for more information'});
});


module.exports = router;
