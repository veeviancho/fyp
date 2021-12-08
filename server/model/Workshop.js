const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkshopSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    // date: Date,
    // startTime: Date,
    // endTime: Date,
    // venue: String,
    // organiser: String,
    // programme: String,
    // category: String,
    // points: Number,
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = Workshop = mongoose.model("workshops", WorkshopSchema)