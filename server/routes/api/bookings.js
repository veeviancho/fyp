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
        title: req.body.title,
        description: req.body.description,
    });
    newBooking
        .save()
        .then(room => res.json({
            room: room,
            success: true
        }))
        .catch(err => console.log(err));
})

module.exports = router;