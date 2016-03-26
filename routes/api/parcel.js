var express = require('express');
var utils = require('./utils');
var router = express.Router();
var restful = require('node-restful');
var mongoose = restful.mongoose;
var stormpath = require('express-stormpath');

var Parcel = mongoose.model('Parcel', Parcel);
var Batch = mongoose.model('ParcelBatch', Batch);
var Content = mongoose.model('ParcelContent', Content);
var Voucher = mongoose.model('ParcelVoucher', Voucher);





router.post('/', stormpath.apiAuthenticationRequired, function(req, res, next) {
    if(utils.isSet([req.body.batchId])) {
        Batch.findOne({'_id': req.body.batchId}, function(err) {
            if(err) {
                res.send(utils.GenerateError("110","Batch not found"));
                return;
            }
        });
    }

    var result = utils.BuildParcelFromData(req);

    if(!result["errorCode"])
    {
        var parcels = new Array();
        var contents = new Array();
        parcels.push(result.parcel);
        contents.push(result.content);
        var resultObj = {};
        var error = "";

        for(var i=0; i < req.body.vouchers.length; i++) {
            utils.BlindBatchParcelConstructor(result.parcel, result.content, 1, req.body.vouchers, resultObj);
            if(Object.keys(resultObj).length !== 0) {
                parcels.push(resultObj.parcel);
                contents.push(resultObj.content);
            }
        }

        Parcel.insertMany(parcels, function (err){
            if (err) {
                error=err;
            }
        });
        if(error.length === 0) {
            Content.insertMany(contents, function (err){
                if (err) {
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
});


router.get('/parcel/:id', function (req, res, next) {
    if(!utils.isSet([req.params.id])) {
        res.send(utils.GenerateError("100","The Message was missing parameters",["Id"]));
    } else {
        Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
            if (err){
                res.send(err);
            }
            res.send(parcel);
        });
    }
});


router.get('/batch/:id', function (req, res, next) {
    if(!utils.isSet([req.params.id])) {
        res.send(utils.GenerateError("100","The Message was missing parameters",["Id"]));
    } else {
        Batch.findOne({'_id':req.params.id}, function(err, batch) {
            if(err) {
                res.send(err);
            } else {
                res.send(batch);
            }

        });
    }
});

router.post('/batch', function (req,res,next) {
    var result = utils.GenerateBatch(req);
    if(!result["errorCode"]) {

        result.save(function(err){
            if(err != null) {
                result = err;
            }
        });

    }
    res.send(result);
});

//TODO: To test
router.put('/parcel/:id/pass',function (req,res,next){
    if(!utils.isSet([req.params.id])) {
        res.send(utils.GenerateError("100","The Message was missing parameters",["Id"]));
    } else {
        Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
            if(err) {
                res.send(err);
            } else {
                var result = utils.PassParcel(parcel, "TODO", req.body.newOwner);    //TODO: Replace todo with actual user id making the call

                if(typeof result.errorCode !== 'undefined' || typeof result.parcel === 'undefined') {
                    res.send(result.errorCode);
                } else {

                    result.parcel.save(function(err) {
                        if(err) {
                            res.send(err);
                        } else {
                            res.send(result.parcel);
                        }
                    });

                }
            }

        });
    }
});


//TODO: To test
router.put('/parcel/:id/open', function (req,res,next) {
    if(!utils.isSet([req.params.id])) {
        res.send(utils.GenerateError("100","The Message was missing parameters",["Id"]));
    } else {
        Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
            if(err) {
                res.send(err);
            } else {
                var result = utils.OpenParcel(parcel, "TODO"); //TODO: Replace todo with actual user id making the call

                if(typeof result.errorCode !== 'undefined' || typeof result.parcel === 'undefined') {
                    res.send(result.errorCode);
                } else {

                    result.parcel.save(function(err) {
                        if(err) {
                            res.send(err);
                        } else {
                            res.send(result.parcel);
                        }
                    });
                }
            }
        });
    }
});


//TODO: To test
router.get('/batch/:id/all', function (req,res,next) {
    if(!utils.isSet([req.params.id])) {
        res.send(utils.GenerateError("100","The Message was missing parameters",["Id"]));
    } else {
        Batch.findOne({'_id': req.params.id}), function (err, batch) {
            if(err) {
                res.send(err);
            } else {
                if(!batch) {
                    //No results found
                    res.send(utils.GenerateError("110","Batch not found"));
                } else {
                    Parcel.find({'batchId': req.params.id}, function (err, parcels) {
                        if(err) {
                            res.send(err);
                        } else if(!parcels) {
                            res.send(utils.GenerateError("120","Parcels not found for Batch"));
                        } else {
                            res.send(parcels);
                        }
                    });
                }
            }
        }
    }
});


//TODO: To test
router.get('/parcel/:id/content', function (req,res,next) {
    //Get content of parcel by parcel id
    if(!utils.isSet([req.params.id])) {
        res.send(utils.GenerateError("100","The Message was missing parameters",["Id"]));
    } else {
        Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
           if(err) {
               res.send(err);
           } else if (!parcel) {
               res.send(utils.GenerateError("111","Parcel not found"));
           } else {
               if(utils.isSet([parcel.contentId])) {
                    Content.findOne({'_id': parcel.contentId}, function(err, content) {
                        if(err) {
                            res.send(err);
                        } else if(!content) {
                            res.send(utils.GenerateError("112","Content not found"));
                        } else {
                            res.send(content);
                        }
                    });
               } else {
                   res.send(utils.GenerateError("102","Parcel contains no content"));
               }
           }
        });
    }
});


//TODO: To test
router.get('/parcel/:id/voucher', function (req,res,next) {
    //Get voucher code where parcel id is X
    if(!utils.isSet([req.params.id])) {
        res.send(utils.GenerateError("100","The Message was missing parameters",["Id"]));
    } else {
        Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
            if (err) {
                res.send(err);
            } else if (!parcel) {
                res.send(utils.GenerateError("111", "Parcel not found"));
            } else {
                if(utils.isSet([parcel.contentId])) {
                    Content.findOne({'_id': parcel.contentId},{ code: 1, _id:0}, function(err, voucher) {
                        if(err) {
                            res.send(err);
                        } else if(!voucher) {
                            res.send(utils.GenerateError("112","Content not found"));
                        } else {
                            res.send(voucher);
                        }
                    });
                } else {
                    res.send(utils.GenerateError("102","Parcel contains no content"));
                }
            }
        });
    }
});


//TODO: To test
//TODO: Add If deleted checks to all gets and updates
router.delete('parcel/:id/delete', function (req,res,next) {
    //Delete parcel by id
    if(!utils.isSet([req.params.id])) {
        res.send(utils.GenerateError("100","The Message was missing parameters",["Id"]));
    } else {
        Parcel.findOne({'_id': req.params.id}, function (err, parcel) {
            if (err) {
                res.send(err);
            } else if (!parcel) {
                res.send(utils.GenerateError("111", "Parcel not found"));
            } else {
                if(parcel.deleted === true) {
                    res.send(utils.GenerateError("103", "Parcel has already been deleted"));
                } else {
                    parcel.deleted = true;
                    parcel.save(function(err) {
                        if(err) {
                            res.send(err);
                        } else {
                            res.send(parcel);
                        }
                    });
                }
            }
        });
    }
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
