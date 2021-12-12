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
        required: true
    },
    programme: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
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