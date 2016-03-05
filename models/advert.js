var restful = require('node-restful');
var mongoose = restful.mongoose;

var AdvertSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ownerId: { type:String, required: true},
    extensionData: {type: String, required: true},
    url: {type:String, required: true}
});

module.exports = restful.model('Advert', AdvertSchema);