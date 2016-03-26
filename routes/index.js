var express = require('express');
var router = express.Router();


// Render the home page.
router.get('/', function(req, res) {
  res.render('index', {title: 'Home', user: req.user});
});


router.get('/Home', function(req, res) {
  res.render('Home', {title: 'Home', user: req.user});
});

// Render the dashboard page.
router.get('/dashboard', function (req, res) {
  if (!req.user || req.user.status !== 'ENABLED') {
    return res.redirect('/login');
  }

  res.render('dashboard', {title: 'Dashboard', user: req.user});
});

<<<<<<< HEAD
// Render the create parcel page.
router.get('/createparcel',  function(req, res) {

  res.render('createparcel', {title: 'Create Parcel', user: req.user});

  console.log('hello');

});

router.post('/created', function(req, res){
  res.render('index', {title: 'Create Parcel', user: req.user});
  console.log('how are you');
  console.log(JSON.stringify(req.body));
  res.end();

});

/* var result = utils.BuildParcelFromData(req);

 if(!result["errorCode"])
 {
 var error = "";
 result.parcel.save(function (err) {
 if (err) {
 error=err;
 }
 });
 if(error.length === 0) {
 result.content.save(function(err){
 if(err) {
 error=err;
 }
 });
 }
 if(error.length === 0) {
 result.batch.save(function(err){
 if(err) {
 error=err;
 }
 });
 }

 if(error)
 {
 res.send(error);
 }
 }
 res.send(result);
 */


module.exports = router;
=======
router.get('/login', function(req,res) {
  res.sendFile('login.html', {root: './views/partials/'});
});

router.get('/logout', function(req,res) {
  res.sendFile('logout.html', {root: './views/partials/'});
});

module.exports = router;
>>>>>>> origin/master
