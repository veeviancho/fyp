// Import express router
const express = require('express');
const router = express.Router();

// Import Booking model
const Booking = require('../../model/Booking');

/**
 * @route POST api/bookings/create
 * @desc Create new booking
 * @access Private
 */
router.post('/create', (req, res) => {
    // Validation: check if same timing has been made for a particular room
    // Booking.findOne({ roomId: req.body.roomId, $or: [{start: {$lte: req.body.start}, end: {$gte: req.body.end}}, {start: {$gte: req.body.start}, end: {$lte: req.body.end}}] })
    // .then(booking => {
    //     if (booking) {
    //         return res.status(400).json({
    //             booking: booking,
    //             msg: "Unable to book! Clashed timing!",
    //             clash: true
    //         })
    //     }
    // })
    // .catch(err => {
    //     console.log(err)
    // })

    // Validation: check date is future date
    // const today = new Date()
    // const bookingDatetime = Date.parse(String(req.body.date) + "T" + String(req.body.start) + ":00")
    // if (bookingDatetime <= today.getTime()) {
    //     return res.status(400).json({
    //         msg: "Date should be future date."
    //     })
    // }

    // Validation: check roomId and userId exist

    // If validated, save new booking
    const newBooking = new Booking({
        userId: req.body.userId,
        roomId: req.body.roomId,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        closed: req.body.closed,
        // workshopId: req.body.workshopId,
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

/**
 * @route GET api/bookings/:roomId
 * @desc Return bookings associated with room
 * @access Private
 */
router.get('/:id', (req, res) => {
    Booking.find({ roomId: req.params.roomId })
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