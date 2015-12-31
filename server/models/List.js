var restful = require('node-restful');
var mongoose = restful.mongoose;

var CategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    categoryType: {type:Boolean},
});

var ProviderSchema = new mongoose.Schema({
    name: {type: String, required: true},
});

module.exports = restful.model('Category', CategorySchema);
module.exports = restful.model('Provider', ProviderSchema);
