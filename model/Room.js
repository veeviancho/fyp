const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageLink: {
        type: String
    },
    maxUsers: {
        type: Number
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

module.exports = Room = mongoose.model("rooms", roomSchema);