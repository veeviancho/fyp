const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: {
        type: Number
    },
    roomId: {
        type: Number
    },
    start: {
        dateTime: {
            type: Date
        }
    },
    end: {
        dateTime: {
            type: Date
        }
    },
    closed: {
        meta: {
            type: Boolean
        },
        start: {
            dateTime: {
                type: Date
            }
        },
        end: {
            dateTime: {
                type: Date
            }
        }
    },
    workshopId: {
        type: Number
    },
    purpose: {
        type: String
    }
})

module.exports = Booking = mongoose.model("bookings", BookingSchema)