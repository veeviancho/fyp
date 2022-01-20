const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: {
        type: String
    },
    roomId: {
        type: String
    },
    date: {
        // type: Date
        type: String
    },
    start: {
        // type: Date
        type: String
    },
    end: {
        // type: Date
        type: String
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