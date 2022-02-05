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
        type: String
    },
    start: {
        type: String
    },
    end: {
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
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
    }
})

module.exports = Booking = mongoose.model("bookings", BookingSchema)