var express = require('express');
var router = express.Router();

//models
var Owners = require('../models/owner');
var Adverts = require('../models/advert');
var Parcels = require('../models/parcel');
var Categories = require('../models/list');
var Providers = require('../models/list');
var Errors = require('../models/errorhandling');
var Information = require('../models/errorhandling');

/* GET api listing. */
Owners.methods(['get', 'put', 'post', 'delete']);
Owners.register(router, '/api/user');

Parcels.methods(['get', 'put', 'post', 'delete']);
Parcels.register(router, '/api/parcel');

Adverts.methods(['get', 'put', 'post', 'delete']);
Adverts.register(router, '/api/advert');

Categories.methods(['get', 'put', 'post', 'delete']);
Categories.register(router, '/api/category');

Providers.methods(['get', 'put', 'post', 'delete']);
Providers.register(router, '/api/provider');

router.get('/', function(req, res, next) {
    res.send({'api version': '1.0', 'teamMembers':['Martin Talbot', 'Matthew West'], 'message':'Please Refer to the API documentation http://www.Placeholder.com/documentation/ for more information'});
});


module.exports = router;
