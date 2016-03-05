var express = require('express');
var router = express.Router();
var utils = require('./api/utils');
var stormpath = require('express-stormpath');
var restful = require('node-restful');
var mongoose = restful.mongoose


// Render the create parcel page.
router.get('/',  function(req, res) {
  res.render('createparcel', {title: 'Create Parcel', user: req.user});
});

router.get('/createparcel', function(req, res){

	response = {
       parcelname:req.query.parcelName,
   };
   res.end(JSON.stringify(response));
})

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