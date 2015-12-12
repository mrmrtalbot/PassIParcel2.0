var restful = require('node-restful');
var mongoose = restful.mongoose;

var UsersSchema = new mongoose.Schema( {
	username: String,
	password: String,
	email: String,


});

module.exports = restful.model('Users', UsersSchema);