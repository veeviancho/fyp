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
    // date: {
    //     type: Date,
    //     required: true
    // },
    // startTime: {
    //     type: Date,
    //     required: true
    // },
    // endTime: {
    //     type: Date,
    //     required: true
    // },
    // venue: {
    //     type: String,
    //     required: true
    // },
    // organiser: {
    //     type: String
    // },
    // programme: {
    //     type: String
    // },
    // category: {
    //     type: String
    // },
    // points: {
    //     type: Number,
    //     default: 0
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Workshop = mongoose.model("workshops", WorkshopSchema)