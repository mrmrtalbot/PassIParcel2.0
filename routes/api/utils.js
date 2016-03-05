var restful = require('node-restful');
var mongoose = restful.mongoose;
var utils = require('./utils');

var Parcel = mongoose.model('Parcel', Parcel);
var ParcelContent = mongoose.model('ParcelContent', ParcelContent);
var Voucher = mongoose.model('ParcelVoucher', Voucher);
var Batch = mongoose.model('ParcelBatch', Batch);


var ErrorMessage = mongoose.model('Error', Error);
//var InformationMessage = mongoose.model('Info', Info);


module.exports.testFunctionality = function() {
    return"Yay";
};


module.exports.BuildParcelFromData = function (req){
    var Result = {};
    var p = new Parcel;
    var fields = new Array();
    if(utils.isSet([req.body.expiryDate])) {
        p.expiryDate = req.body.expiryDate;
    }
    if(utils.isSet([req.body.name])) {
        p.name = req.body.name;
    } else {
        fields.push("name");
    }

    if(utils.isSet([req.body.openMethods]) && req.body.openMethods.length > 0) {
        p.openMethods =  [];
        for(var i =0; i < req.body.openMethods.length; i++) {
            if(req.body.openMethods[i].hasOwnProperty('name') && req.body.openMethods[i].hasOwnProperty('description')) {
                p.openMethods.push({name:req.body.openMethods[i].name, description:req.body.openMethods[i].description});
            } else {
                fields.push ("malformed open method at index " + i);
            }
        }
    } else {
        fields.push("openMethods");
    }

    //TODO: Get current user via stormpath
    if(true)
    {
        p.currentUser = "TODO";
    }

    //TODO: Get current user via stormpath
    if(true)
    {
        p.previousUsers.push("TODO");
    }

    if(utils.isSet([req.body.category])) {
        p.category = req.body.category;
    } else {
        fields.push("category");
    }

    if(utils.isSet(([req.batchId])))
    {
        p.batchId = req.body.batchId;
    } else {
        utils.GenerateBatch(req, p, fields, Result);

        if("batch" in Result) {
            p.batchId = Result.batch._id;
        } else {
            fields.push("Batch creation failure");
        }
    }


    if(utils.isSet([req.body.content])) {
        var temp = utils.BuildParcelContentFromData(req, p, fields, Result);
        if(temp === Array) {
            fields.push.apply(fields, temp);
        }
    } else {
        fields.push("parcel.content");
    }

    if(fields.length > 0) {
        var e = utils.GenerateError("100","The Message was missing parameters",fields.slice());
        return e;
    }
    p.dateUpdated = Date.now();
    if("content" in Result)
    {
        p.contentId = Result.content._id;
    }
    Result.parcel = p;

    return Result;
};

module.exports.PassParcel = function(parcel,requestor, newOwner) {
    var Result = {};
    var fields = new Array();
    if(typeof parcel === 'undefined') {
        fields.push("Parcel not found");
    }
    if(typeof requestor === 'undefined' || requestor.length === 0) {
        fields.push("Anonymous sender, pass failed");
    }
    if(typeof newOwner === 'undefined' || newOwner.length === 0) {
        fields.push("New parcel owner not specified");
    }

    //TODO : check if new owner is a user on the system

    if(typeof requestor === 'String' && typeof newOwner === 'String' && parcel.ownerId === requestor) {
        if(parcel.previousUsers.indexOf(newOwner) > -1) {
            fields.push("The parcel cannot be handed to this person. They have already recieved this parcel.");
        } else {
            parcel.previousUsers.push(requestor);
            parcel.currentUser = newOwner;
        }

    } else {
        return utils.GenerateError("100","The Message was missing parameters");
    }

    if(fields.length > 0) {
        Result.errorCode = fields;
    } else {
        parcel.dateUpdated = Date.now();
        Result.parcel = parcel;
    }

    return Result;

};

module.exports.OpenParcel = function(parcel, requestor) {
    var Result = {};
    var fields = new Array();

    if(typeof parcel === 'undefined') {
        fields.push("Parcel not found");
    }

    if(typeof requestor === 'undefined' || requestor.length === 0) {
        fields.push("Anonymous requester, open failed");
    }

    if(typeof request === 'string' && parcel.currentUser === requestor) {
        // Person is authorised to open it
        //TODO - What happens when you open a parcel
    }

    if(fields.length > 0) {
        Result.errorCode = fields;
    } else {
        parcel.dateUpdated = Date.now();
        Result.parcel = parcel;
    }

    return Result;
}



module.exports.BuildParcelContentFromData = function (req, parcel, fields, Result) {
    var hasParcel = true;
    if (typeof parcel === 'undefined') {
        hasParcel =  false;
    }
    if (typeof fields === 'undefined') {
        fields = new Array();
    }

    var content = new ParcelContent;

    if(utils.isSet([req.body.content.name])) {
        content.name = req.body.content.name;
    } else {
        fields.push("content.name");
    }

    if(utils.isSet([req.body.content.extensionData]))
    {
        content.extensionData = req.body.extensionData;
    }

    if(utils.isSet([req.body.content.voucher]))
    {
        if(req.body.content.vouchers.length === 0) {
            fields.push("Content.vouchers contains a blank voucher");
        } else {
            content.voucher = new Voucher();
            content.voucher.code = req.body.content.voucher;
        }
    } else {
        fields.push("content.vouchers");
    }

    if(fields.length > 0) {
        if(hasParcel) {
            return fields;
        } else {
            var e = utils.GenerateError("101","The Message was missing parameters",fields.slice());
            return e;
        }
    } else {
        content.dateUpdated = Date.now();
        Result.content = content;
    }
};


module.exports.GenerateBatch = function (req, parcel, fields ,Result) {
    var b = new Batch();
    if(typeof fields === 'undefined')
    {
        fields = new Array();
    }

    if(typeof req === 'undefined') {
        fields.push("Batch");
    }


    if(typeof parcel === 'undefined') {
        if(utils.isSet([req.body.name])) {
            b.name = req.body.name;
        } else {
            fields.push("Batch.name");
        }
    } else {
        if(utils.isSet([parcel.name])) {
            b.name = parcel.name + " Batch";
        } else {
            fields.push("Batch.name");
        }
    }

    //TODO: Get Owner ID
    if(true) {
        b.ownerId = "TODO";
    }


    if(fields.length > 0) {

        var e = utils.GenerateError("101","The Message was missing parameters",fields.slice());
        return e;
    } else if(typeof Result === 'undefined') {
        return b;
    } else {
        Result.batch = b;
    }
}

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

module.exports.guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
