var restful = require('node-restful');
var mongoose = restful.mongoose;

var AdvertSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String},
    provider: {type: String},
});

module.exports = restful.model('Advert', AdvertSchema);