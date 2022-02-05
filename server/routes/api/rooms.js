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
        imageLink: req.body.imageLink,
        maxUsers: req.body.maxUsers
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

/**
 * @route PUT api/rooms/update
 * @desc Update workshop information
 * @access Private (admin only)
 */
router.put('/update', (req, res) => {
    Room.findOneAndUpdate({ _id: req.body.id }, { $set: req.body })
        .then(room => {
            if (!room) {
                return res.status(404).json({
                    msg: "Room not found!"
                })
            }
            return res.status(200).json({
                msg: "Updated successfully!",
                success: true
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                msg: "Encountered an error. Unable to update!"
            })
        })
})

/**
 * @route DELETE api/rooms/delete
 * @desc Delete workshop
 * @access Private (admin only)
 */
router.delete('/delete/:id', (req, res) => {
    Room.findOneAndDelete( { _id: req.params.id } )
        .then( room => {
            if (!room) {
                return res.status(404).json({
                    msg: "Room not found!"
                })
            }
            return res.status(200).json({
                success: true
            })
        })
        .catch( err => {
            console.log(err)
            return res.status(400).json({
                msg: "Unable to delete. Please try again later."
            })
        })
        // TODO: remove the workshop from the user
})

module.exports = router;