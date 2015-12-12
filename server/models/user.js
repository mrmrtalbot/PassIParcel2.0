var restful = require('node-restful');
var validation = require('../Helpers/ValidationHelper');
var mongoose = restful.mongoose;

var UserDataSchema = new mongoose.Schema({
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
	type: {type:Number},
});

var TokenSchema = new mongoose.schema({
	Id: {type: String, default: validation.guid},
	expiry: {type: Date, default: new Date(new Date().setYear(new Date().getFullYear() + 1))},
})

var UsersSchema = new mongoose.Schema({
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
	token: [{ type: TokenSchema}],
	role: [{type:String, required: true}],
	userData: {type:UserDataScheme},
});


module.exports = restful.model('User', UsersSchema);
module.exports = restful.model('UserData', UserDataSchema);
module.exports = restful.model('Token', TokenSchema);
