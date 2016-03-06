var express = require('express');
var router = express.Router();
var utils = require('./api/utils');
var stormpath = require('express-stormpath');
var restful = require('node-restful');
var mongoose = restful.mongoose;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({ extended: true }))

router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


// Render the create parcel page.
router.get('/',  function(req, res) {

  res.render('createparcel', {title: 'Create Parcel', user: req.user});

    console.log('hello');

});

router.post(function(req, res){
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