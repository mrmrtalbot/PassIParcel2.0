var restful = require('node-restful');
var mongoose = restful.mongoose;
var Advert = mongoose.model('Advert', Advert);


var VoucherSchema = new mongoose.Schema({
	id: {type: Number, index:true},
	code: {type:String, required:true}
});

var ParcelContentSchema = new mongoose.Schema({
	id: {type: Number, index: true},
	dateCreated: { type: Date, default:Date.now },
	dateUpdated: { type: Date, default:Date.now },
	name: {type:String, required:true},
	voucher: {type: VoucherSchema, required: true},
	extensionData: {type:String},
});


//TODO: Adverts update and schema change
var ParcelSchema = new mongoose.Schema({
	id: {type: Number, index: true},
	dateCreated: { type: Date, default:Date.now },
	dateUpdated: { type: Date, default:Date.now },
	expiryDate: {type: Date, default: new Date(new Date().setYear(new Date().getFullYear() + 1))},
	name: {type: String, required: true},
	openMethods: [{
		id: {type: Number},
		name: {type: String},
		description: {type: String},
	}],
	currentUser: {type: String, required: true},
	previousUsers:[{type:String}],
	contentId: {type: String , required: true},
	batchId: {type: String, required: true},
	adverts: [{
		advert:{type: String, required: true}
	}],
	opened: {type:Boolean, required: true, default: false},
	deleted: {type: Boolean, required: true, default:false},
});


var ParcelBatchSchema = new mongoose.Schema({
	id: {type: Number, index: true},
	dateCreated: {type: Number, default: Date.now()},
	dateUpdated: { type: Date, default:Date.now() },
	name: {type: String, required: true},
	ownerId: {type: String},		//TODO: Implement as required when owner ID is implemented
});



module.exports = restful.model('Parcel', ParcelSchema);
module.exports = restful.model('ParcelContent', ParcelContentSchema);
module.exports = restful.model('ParcelBatch', ParcelBatchSchema);
module.exports = restful.model('ParcelVoucher', VoucherSchema);

// Parcel Content schema change to id, name, content, extensionData, date updated, expiry of coupon
// Parcel schema to contain id, expiry date, name, content, category, open method, probability, current owner id and previous owners(s) - string array, batch id, date updated
// Parcel Batch schema - date created, name, owner id, description, date updated
// Add ID to openMethod


//In batch creation they would pass Name of batch, description of batch, expiry date of parcels, category of parcels, list of coupon codes, expiry date of coupon codes
