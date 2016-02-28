var express = require('express');
var utils = require('./utils');
var router = express.Router();
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Parcel = mongoose.model('Parcel', Parcel);
var Batch = mongoose.model('ParcelBatch', Batch);


router.post('/', function(req, res, next) {
    var result = utils.BuildParcelFromData(req);
    if(!result["errorCode"])
    {
        var error;
        result.parcel.save(function (err) {
            if (err) {
                error=err;
            }
        });
        result.content.save(function(err){
           if(err) {
               error=err;
           }
        });
        if(error)
        {
            res.send(error);
        }
    }
    res.send(result);
});


router.get('/:id', function (req, res, next) {
    Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
        if (err){
            res.send(err);
        }
        res.send(parcel);
    });
});

router.get('/content/:id', function (req, res, next) {
    Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
        if (err){
            return err;
        }
        res.send(parcel.content);
    });
});


router.put('/:id', function (req, res, next) {
    var query = {'_id': req.params.id};
    var updated = req.body;

    Parcel.findOneAndUpdate(query,updated, function (err, parcel) {
        if (err) {
            res.send(err);
        }

        res.send(parcel);
    });
});

router.put('/:id/batch/', function (req, res, next){
    Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
        if (err){
            res.send(err);
        }
        if(!utils.isSet(req.body.batchId)) {
            res.send(utils.GenerateError("100","The Message was missing parameters",["batchId"]));
        } else {
            parcel.content.batchId = req.body.batchId;
            parcel.save(function (err) {
                if (err) {
                    res.send(err);
                }
            });
            res.send(parcel);
        }
    });
});

router.get('/batch/:id', function (req, res, next) {
   Batch.find({'_id':req.params.id}, function(err, batch) {
   		if(err) {
   			res.send(err);
   		} else {
   			res.send(batch);
   		}
   		
   });
});

router.post('/batch', function (req,res,next) {
    //Add a Batch
});

router.put('/batch',function (req,res,next){
   // Update a batch
});

//POST User
//Registers a user
//Map submitted request into a User Model -> Validate Model -> Post if successful, return error if not


//POST User/UserData
//Register User data
//Map submitted request into a User Data Model -> Validate Model -> Validate User exists and is authorised ->
//Post if successful, return error if not


//POST User/Login
//Crypto submitted password -> Compare username/password with that in the database -> Return Login message if successful
//-> Else return incorrect login/pass

//POST User/Logout
//Check if logged in -> If Logged in then clear current session and log out else return not logged in error

//PUT User/UserData
//Update User Data
//Map submitted request into a User Data Model -> Validate Model -> Validate User exists and is authorised ->
//Post if successful, return error if not

//GET User/
//RetrieveUserDetails
//Check if logged in or authorised to access  -> If authorised then return the user, else error

//GET User/UserData
//Retrieve User Details
//Check if logged in or authorised to access  -> If authorised then return the user, else error





//POST Parcel
// Add parcel to DB

//PUT Parcel
//Update Parcel

//PUT Parcel/Content
//Update Parcel Contents

//GET Parcel
//Retrieve a Parcel

//GET Parcel/Content
//Retrieve a Parcels contents

//GET Parcel/User
//Get Parcels assigned to a user




//POST Advert
//Add advert to DB

//POST Advert/Parcel
//Join advert to parcel

//GET Advert
//Retrieve Advert data to device




//GET Category
//Retrieve list of all categories

//POST Category
//Add a new category






//GET Provider
//Retrieve list of all categories

//POST Provider
//Add a new provider






//POST Security/Activation
// ???

//GET Security/Activation
// ???




module.exports = router;