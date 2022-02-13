// Import express router
const express = require('express');
const router = express.Router();

// Import Booking model
const Booking = require('../../model/Booking');
const Room = require('../../model/Room');
const Workshop = require('../../model/Workshop');

// Import Timing validation check
const timing = require('../../validation/timing')

/**
 * @route POST api/bookings/create
 * @desc Create new booking
 * @access Private
 */
router.post('/create', (req, res) => {
    const roomId = req.body.roomId
    
    Room.findOne({ _id: roomId })
    .then(room => {

        // Validation: Check that there is no full room booking at the time
        Booking.find({ roomId: roomId, bookRoom: true })
        .then(booking => {
            if (booking) {
                let data = {
                    isBooking: true,
                    arr: booking,
                    date: req.body.date,
                    start: req.body.start,
                    end: req.body.end
                }
                let clash = timing(data)
                if (clash) {
                    return res.status(400).json({
                        msg: "Unable to book. A user has reserved the room at the time entered. Please try another date/time."
                    })
                }
            }

            // Validation: Check that there is no workshop at the time
            Workshop.find({ venue: room.title })
            .then(workshop => {
                if (workshop) {
                    let data = {
                        arr: workshop,
                        date: req.body.date,
                        start: req.body.start,
                        end: req.body.end
                    }
                    let clash = timing(data)
                    if (clash) {
                        return res.status(400).json({
                            msg: "Unable to book. A workshop will be taking place at the time entered. Please try another date/time."
                        })
                    }
                }

                // Validation: Check that reserved seats are not full
                Booking.find({ roomId: roomId, bookRoom: false })
                .then(booking => {
                    if (booking) {
                        let data = {
                            isBookingSeat: true,
                            room: room,
                            arr: booking,
                            date: req.body.date,
                            start: req.body.start,
                            end: req.body.end
                        }
                        // Check if full at clashed timing
                        let clash = timing(data)
                        if (clash) {
                            return res.status(400).json({
                                msg: "Unable to book. The room is fully booked at the time entered."
                            })
                        }

                        // Validation: Check that no existing seat bookings if a full room booking is made
                        if (req.body.bookRoom) {
                            let data = {
                                isBooking: true,
                                room: room,
                                arr: booking,
                                date: req.body.date,
                                start: req.body.start,
                                end: req.body.end
                            }
                            let clash = timing(data)
                            if (clash) {
                                return res.status(400).json({
                                    msg: "Some seats in the room have been reserved. Full room booking cannot be made at the moment."
                                })
                            }
                        }

                    }

                    // If validated, save new booking
                    const newBooking = new Booking({
                        bookRoom: req.body.bookRoom,
                        userId: req.body.userId,
                        roomId: req.body.roomId,
                        date: req.body.date,
                        start: req.body.start,
                        end: req.body.end,
                        closed: req.body.closed,
                        purpose: req.body.purpose
                    });
                    newBooking
                        .save()
                        .then(booking => res.json({
                            booking: booking,
                            success: true
                        }))
                        .catch(err => console.log(err));
            
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

/**
 * @route GET api/bookings/all
 * @desc Return all bookings
 * @access Private
 */
router.get('/all', (req, res) => {
    Booking.find({})
    .then(booking => {
        if (!booking) {
            return res.status(404).json({
                msg: "No bookings found."
            })
        }
        return res.status(200).json({
            bookings: booking,
            success: true
        })
    })
    .catch(err => console.log(err))
})

/**
 * @route GET api/bookings/:roomId
 * @desc Return bookings associated with room
 * @access Private
 */
router.get('/:roomId', (req, res) => {
    Booking.find({ roomId: req.params.roomId })
        .then(booking => {
            if (!booking) {
                return res.status(404).json({
                    msg: "Booking not found!"
                })
            }
            return res.status(200).json({
                booking: booking,
                success: true
            })
        })
        .catch( err => {
            console.log(err) 
            return res.status(400).json({
                msg: "Unable to retrieve booking."
            })
        })
})

/**
 * @route GET api/bookings/user/:userId
 * @desc Return bookings associated with user
 * @access Private
 */
router.get('/user/:userId', (req, res) => {
    Booking.find({ userId: req.params.userId })
        .then( booking => {
            if (!booking) {
                return res.status(404).json({
                    msg: "Booking not found!"
                })
            }
            return res.status(200).json({
                booking: booking,
                success: true
            })
        })
        .catch( err => {
            console.log(err) 
            return res.status(400).json({
                msg: "Unable to retrieve booking. Please try again."
            })
        })
})

/**
 * @route DELETE api/bookings/delete/:id
 * @desc Remove booking associated with room
 * @access Private
 */
router.delete('/delete/:id', (req, res) => {
    // Delete booking
    Booking.findOneAndDelete({ _id: req.params.id })
        .then(booking => {
            if (!booking) {
                console.log(req.params.id)
                return res.status(404).json({
                    msg: "Booking not found!"
                })
            }
            return res.status(200).json({
                deleted: booking,
                success: true
            })
        })
        .catch( err => {
            console.log(err)
            return res.status(400).json({
                msg: "Unable to delete. Please try again later."
            })
        })
})

module.exports = router;