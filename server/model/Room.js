const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = Room = mongoose.model("rooms", roomSchema);