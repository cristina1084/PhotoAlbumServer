var mongo = require('mongoose');

var schema = mongo.Schema;

var albumSchema = new schema({
    user: String,
    name : String,
    description : String
});

var albumModel = mongo.model("albums", albumSchema);

module.exports = albumModel;