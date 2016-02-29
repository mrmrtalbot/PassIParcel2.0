var restful = require('node-restful');
var mongoose = restful.mongoose;
//var OwnerModel = mongoose.model('Owner', Owner);

var AdvertSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String},
    ownerId: { type:String, required: true},
});

module.exports = restful.model('Advert', AdvertSchema);