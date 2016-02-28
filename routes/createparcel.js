var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');


// Render the create parcel page.
router.get('/',  stormpath.loginRequired,  function(req, res) {
  res.render('createparcel', {title: 'Create Parcel', user: req.user});
});

module.exports = router;