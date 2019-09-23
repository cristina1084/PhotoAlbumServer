var mongo = require('mongoose');

var schema = mongo.Schema;

var userSchema = new schema({
    fullname : String,
    email : String,
    username : String,
    password : String,
    dob: Date,
    gender: String
});

var usersModel = mongo.model("users", userSchema);

module.exports = usersModel;