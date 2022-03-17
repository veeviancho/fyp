const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    bookRoom: {
        type: Boolean
    },
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
        type: Boolean
    },
    purpose: {
        type: String
    },
    seatNo: {
        type: Number
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
    }
})

module.exports = Booking = mongoose.model("bookings", BookingSchema)