// Import express router
const express = require('express');
const router = express.Router();

// Import rooms model
const Room = require('../../model/Room');

// Import multer for file upload
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../../../client/public/uploads/'));
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
  
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

/**
 * @route POST api/rooms/create
 * @desc Create new room
 * @access Private (admin only)
 */
router.post('/create', upload.single('imageLink'), (req, res) => {
    const newRoom = new Room({
        title: req.body.title,
        description: req.body.description,
        imageLink: req.file.filename,
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
router.put('/update', upload.single('imageLink'), (req, res) => {
    let params = {
        title: req.body.title,
        description: req.body.description,
        imageLink: req.file ? req.file.filename : null,
        maxUsers: req.body.maxUsers
    }

    for (let prop in params) {
        if (!params[prop] || params[prop] == 'undefined') {
            delete params[prop]
            // console.log(params)
        }
    }
    
    Room.findOneAndUpdate({ _id: req.body.id }, { $set: params })
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