// Import express router
const express = require('express');
const router = express.Router();

// Import rooms model
const Room = require('../../model/Room');

/**
 * @route POST api/rooms/create
 * @desc Create new room
 * @access Private (admin only)
 */
router.post('/create', (req, res) => {
    const newRoom = new Room({
        title: req.body.title,
        description: req.body.description,
        // bookings
        // past bookings
    });
    newRoom
        .save()
        .then(room => res.json({
            room: room,
            success: true
        }))
        .catch(err => console.log(err));
})

module.exports = router;