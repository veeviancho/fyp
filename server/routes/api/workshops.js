// Import express router
const express = require('express');
const router = express.Router();

// Load workshop model
const Workshop = require('../../model/Workshop')

/**
 * @route POST api/workshops/create
 * @desc Create new workshop
 * @access Private (admin only)
 */
router.post('/create', (req, res) => {
    const newWorkshop = new Workshop({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        venue: req.body.venue,
        organiser: req.body.organiser,
        programme: req.body.programme,
        category: req.body.category
    });
    newWorkshop
        .save()
        .then(workshop => res.json({
            workshop: workshop,
            success: true
        }))
        .catch(err => console.log(err));
})

/**
 * @route GET api/workshops/all
 * @desc Return all workshops
 * @access Private
 */
router.get('/all', (req, res) => {
    Workshop.find({}).then( workshop => {
        return res.status(201).json({
            workshop: workshop,
            success: true
        })
    })
})

/**
 * @route GET api/workshops/:id
 * @desc Return one workshop
 * @access Private
 */
router.get('/:id', (req, res) => {
    Workshop.findOne({ _id: req.params.id })
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

/**
 * @route PUT api/workshops/update/:id
 * @desc Update workshop information
 * @access Private (admin only)
 */
router.put('/update/:id', (req, res) => {
    Workshop.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
        .then(workshop => {
            if (!workshop) {
                return res.status(404).json({
                    msg: "Workshop not found!"
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
 * @route DELETE api/workshops/delete/:id
 * @desc Delete workshop
 * @access Private (admin only)
 */
router.delete('/delete/:id', (req, res) => {
    Workshop.findOneAndDelete( { _id: req.params.id } )
        .then( () => {
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
})

module.exports = router;