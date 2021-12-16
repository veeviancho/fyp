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
    points: {
        type: Number,
        default: 0
    },
    maxUsers: {
        type: Number,
        required: true
    },
    users: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Workshop = mongoose.model("workshops", WorkshopSchema)