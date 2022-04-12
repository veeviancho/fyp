const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    programme: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    imageLink: {
        type: String
    },
    workshops: {
        type: Array,
    },
});

//Export this object UserSchema
module.exports = User = mongoose.model("users", UserSchema);
//"users" table = this is the name of collection which we are going to use