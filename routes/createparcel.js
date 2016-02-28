var express = require('express');
var router = express.Router();


// Render the create parcel page.
router.get('/createparcel',  stormpath.loginRequired,  function(req, res) {
  res.render('createparcel', {title: 'Home', user: req.user});
});

module.exports = router;