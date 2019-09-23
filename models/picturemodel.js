var mongo = require('mongoose');

var schema = mongo.Schema;

var pictureSchema = new schema({
    user: String,
    albumName: String,
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    title: String,
    description: String
});

var pictureModel = mongo.model("pictures", pictureSchema);

module.exports = pictureModel;