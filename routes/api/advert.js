var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');


router.get('/', function(req, res, next) {
    res.send({'text':'Advert Routes'});
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

//POST Parcel/Content
//Assign contents to a parcel

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