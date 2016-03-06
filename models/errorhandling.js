var restful = require('node-restful');
var mongoose = restful.mongoose;

var ErrorSchema = new mongoose.Schema({
    errorCode: {type: String, required: true},
    message: {type: String},
    fields: {type: [String]},
});

var InformationSchema = new mongoose.Schema({
    messageCode: {type: String, required: true},
    message: {type: String},
});

module.exports = restful.model('Error', ErrorSchema);
module.exports = restful.model('Info', InformationSchema);


/*
Error Codes:
    10: Generic error
    100: Missing parameters from request message
    101: Document not found
    102: Parcel contains no content
    103: Parcel has already been deleted
    110: Batch not found
    111: Parcel not found
    112: Content not found
    120: Parcels not found for Batch
    121: Attempt to modify a parcel they do not own
*/

/*
Information Codes:
    1:Generic Success


 */