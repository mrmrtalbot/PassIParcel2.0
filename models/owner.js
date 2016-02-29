var restful = require('node-restful');
var mongoose = restful.mongoose;

var OwnerDataSchema = new mongoose.Schema({
	phoneNumber: {type:String},
	confirmKey: {type:String},
	confirmed: {type:Boolean},
	timestamp: {type:Date},
	name: {
		first: {type: String},
		last: { type: String, trim: true }
	},
	email: {type:String},
	deviceSession: {type:String},
	webSession: {type:String},
	address: {
		line1: {type: String, required: true},
		line2: { type: String},
		line3: { type: String},
		town: {type: String, required: true},
		county: {type:String},
		country: {type: String, required:true},
		postCode: {type:String, required:true},
	},
	userType: {type:Number},
});

var OwnerSchema = new mongoose.Schema({
	id: { type: Number, index: true},
	name: {
		first: {type: String},
		last: { type: String, trim: true }
	},
	username: { type: String, required: true, unique: true},
	age: { type: Number, min: 0 },
	password: { type: String, required: true},
	email: {type: String, required: true, unique: true},
	dateCreated: { type: Date, default:Date.now },
	points: {type: Number, default:0},
	token: { type: [TokenSchema]},
	role: {type:[String], required: true},
	userData: {type:UserDataSchema},
});


module.exports = restful.model('Owner', OwnerSchema);
module.exports = restful.model('OwnerData', OwnerDataSchema);
module.exports = restful.model('Token', TokenSchema);
