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

/**
 * @route GET api/rooms/all
 * @desc Read all rooms in database
 * @access Public
 */
router.get('/all', (req, res) => {
    Room.find({})
        .then( rooms => {
            if (!rooms) {
                return res.status(404).json({
                    msg: "No room available."
                })
            }
            return res.status(201).json({
                rooms: rooms,
                success: true
            })
        })
        .catch( err => {
            console.log(err)
        })
})

module.exports = router;