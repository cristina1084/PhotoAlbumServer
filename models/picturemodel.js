var mongo = require('mongoose');

var schema = mongo.Schema;

var pictureSchema = new schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
});

var pictureModel = mongo.model("pictures", pictureSchema);

module.exports = pictureModel;