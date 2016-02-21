var restful = require('node-restful');
var mongoose = restful.mongoose;

var ParcelContentSchema = new mongoose.Schema({
	id: {type: Number, index: true},
	dateCreated: { type: Date, default:Date.now },
	name: {type:String, required:true},
	batchId: {type:Number, required: true},
	passes: {type:Number, required:true, default: 0, min: 0, max:5 },
	probability: {type:Number, default: 1, min:0.0001},
	openMethod: [{
		name: {type: String},
		description: {type: String},
	}],
});

var ParcelSchema = new mongoose.Schema({
	id: {type: Number, index: true},
	expiryDate: {type: Date, default: new Date(new Date().setYear(new Date().getFullYear() + 1))},
	name: {type: String, required: true},
	currentUser: {type: String, required: true},
	previousUsers[{type:String}]
	content: {type: ParcelContentSchema},
	category: {type: String},
});

var ParcelBatchSchema = new mongoose.Schema({
	dateCreated: {type: Number, default: Date.now()},
	name: {type: String, required: true},
	ownerId: { type:String, required: true},
	passes: {type:Number, min: 0},
	probability: {type:Number, default: 1, min:0.0001},
	parcels: [ParcelSchema],
});



module.exports = restful.model('Parcel', ParcelSchema);
module.exports = restful.model('ParcelContent', ParcelContentSchema);
module.exports = restful.model('ParcelBatch', ParcelBatchSchema);