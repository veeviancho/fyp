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
    const newBooking = new Booking({
        userId: req.body.userId,
        roomId: req.body.roomId,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        closed: {
            meta: req.body.closed,
            start: req.body.closedStart,
            end: req.body.closedEnd
        },
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
 * @route GET api/bookings/:id
 * @desc Return booking associated with room
 * @access Private
 */
router.get('/:id', (req, res) => {
    Booking.findOne({ roomId: req.params.id })
        .then( workshop => {
            if (!workshop) {
                return res.status(404).json({
                    msg: "Workshop not found!"
                })
            }
            return res.status(200).json({
                workshop: workshop,
                success: true
            })
        })
        .catch( err => {
            console.log(err) 
            return res.status(400).json({
                msg: "Unable to retrieve workshop. Please try again."
            })
        })
})

module.exports = router;