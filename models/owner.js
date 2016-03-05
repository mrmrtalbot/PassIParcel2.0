var restful = require('node-restful');
var mongoose = restful.mongoose;

var OwnerDataSchema = new mongoose.Schema({

});

var OwnerSchema = new mongoose.Schema({

});


module.exports = restful.model('Owner', OwnerSchema);
module.exports = restful.model('OwnerData', OwnerDataSchema);

