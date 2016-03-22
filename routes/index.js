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

router.get('/login', function(req,res) {
  res.sendFile('login.html', {root: './views/partials/'});
});

router.get('/logout', function(req,res) {
  res.sendFile('logout.html', {root: './views/partials/'});
});

module.exports = router;
