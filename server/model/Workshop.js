const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkshopSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No description."
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    organiser: {
        type: String,
        default: "No organiser listed"
    },
    programme: {
        type: String,
        default: "All"
    },
    category: {
        type: String,
        default: "All"
    },
    maxUsers: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    feedback: {
        type: Array
    },
    points: {
        type: Number,
        default: 0
    },
    users: {
        type: Array
    },
})

module.exports = Workshop = mongoose.model("workshops", WorkshopSchema)