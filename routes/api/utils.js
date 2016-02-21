var restful = require('node-restful');
var mongoose = restful.mongoose;
var util = require('./utils');

var Parcel = mongoose.model('Parcel', Parcel);
var Content = mongoose.model('ParcelContent', Content);
var ErrorMessage = mongoose.model('Error', Error);
//var InformationMessage = mongoose.model('Info', Info);


module.exports.testFunctionality = function() {
    return"Yay";
};

module.exports.BuildParcelFromData = function (req){
    var p = new Parcel;
    var fields = new Array();
    if(util.isSet([req.body.expiryDate])) {
        p.expiryDate = req.body.expiryDate;
    }
    if(util.isSet([req.body.name])) {
        p.name = req.body.name;
    } else {
        fields.push("name");
    }

    if(util.isSet([req.body.category])) {
        p.category = req.body.category;
    } else {
        fields.push("category");
    }

    if(util.isSet([req.body.content])) {
        var temp = util.BuildParcelContentFromData(req, p, fields);
        if(temp === Array) {
            fields.push.apply(fields, temp);
        }
    } else {
        fields.push("parcel.content");
    }

    if(fields.length > 0) {
        var e = util.GenerateError("100","The Message was missing parameters",fields.slice());
        return e;
    }
    return p;
};

module.exports.BuildParcelContentFromData = function (req, parcel, fields) {
    var hasParcel = true;
    if (typeof parcel === 'undefined') {
        parcel = new Parcel;
    }
    if (typeof fields === 'undefined') {
        fields = new Array();
    }

    parcel.content = new Content;
    if(util.isSet([req.body.content.dateCreated])) {
        parcel.content.dateCreated = req.body.content.dateCreated;
    }

    if(util.isSet([req.body.content.name])) {
        parcel.content.name = req.body.content.name;
    } else {
        fields.push("content.name");
    }

    if(util.isSet([req.body.content.batchId])) {
        parcel.content.batchId = req.body.content.batchId;
    } else {
        fields.push("content.batchId");
    }

    if(util.isSet([req.body.content.passes])) {
        parcel.content.passes = req.body.content.passes;
    }

    if(util.isSet([req.body.content.probability])) {
        parcel.content.probability = req.body.content.probability;
    }

    if(util.isSet([req.body.content.openMethod]) && req.body.content.openMethod.length > 0) {
        parcel.content.openMethod =  [];
        for(var i =0; i < req.body.content.openMethod.length; i++) {
            if(req.body.content.openMethod[i].hasOwnProperty('name') && req.body.content.openMethod[i].hasOwnProperty('description')) {
                parcel.content.openMethod.push({name:req.body.content.openMethod[i].name, description:req.body.content.openMethod[i].description});
            } else {
                fields.push ("malformed open method at index " + i);
            }
        }
    } else {
        fields.push("content.openMethod");
    }

    if(fields.length > 0 && !hasParcel) {
        if(hasParcel) {
            return fields;
        } else {
            var e = util.GenerateError("101","The Message was missing parameters",fields.slice());
            return e;
        }
    }
};

module.exports.GenerateError = function(code,message,fields) {
    if (typeof code === 'undefined') {
        code = "10";
    }
    if (typeof message === 'undefined') {
        message = "No message specified."
    }
    if (typeof fields === 'undefined') {
        fields = ["No fields specified"];
    }

    var e = new ErrorMessage;
    e.errorCode = code;
    e.message = message;
    e.fields = fields;
    return e;
};

module.exports.GenerateInformation = function(code, message) {
    if (typeof code === 'undefined') {
        code = "1";
    }
    if (typeof message === 'undefined') {
        message = "No message specified."
    }

    var i = new InformationMessage;
    i.messageCode = code;
    i.message = message;
};


module.exports.isSet  = function(a){
    for(var i = 0; i < a.length; i++){
        if(typeof a[i] != 'undefined'){
            continue;
        }
        return false;
    }
    return true;
};

module.exports.strToJson= function(str) {
    eval("var x = " + str + ";");
    return JSON.stringify(x);
};
