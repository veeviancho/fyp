const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: {
        type: Number
    },
    roomId: {
        type: Number
    },
    date: {
        type: Date
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    closed: {
        meta: {
            type: Boolean
        },
        start: {
            type: Date
        },
        end: {
            type: Date
        }
    },
    purpose: {
        type: String
    }
})

module.exports = Booking = mongoose.model("bookings", BookingSchema)