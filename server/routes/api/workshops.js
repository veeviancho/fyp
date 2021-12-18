// Import express router
const express = require('express');
const User = require('../../model/User');
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
        category: req.body.category,
        maxUsers: req.body.maxUsers
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
 * @route PUT api/workshops/update
 * @desc Update workshop information
 * @access Private (admin only)
 */
router.put('/update', (req, res) => {
    let params = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        venue: req.body.venue,
        organiser: req.body.organiser,
        programme: req.body.programme,
        category: req.body.category,
        maxUsers: req.body.maxUsers
    }

    for (let prop in params) {
        if (!params[prop]) {
            delete params[prop]
        }
    }

    Workshop.findOneAndUpdate({ _id: req.body.id }, { $set: params })
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
        // TODO: remove the workshop from the user
})

/**
 * @route GET api/workshops/all
 * @desc Return all workshops
 * @access Private
 */
router.get('/all', (req, res) => {
    Workshop.find({})
        .then( workshop => {
            if (!workshop) {
                return res.status(404).json({
                    msg: "No workshop available."
                })
            }
            return res.status(201).json({
                workshop: workshop,
                success: true
            })
        })
        .catch( err => {
            console.log(err)
        })
})

/**
 * @route PUT api/workshops/register/:workshopId/:userId
 * @desc Register users into workshop
 * @access Private
 */
router.put('/register/:workshopId/:userId', (req, res) => {
    Workshop.findOne({ _id: req.params.workshopId })
        .then( workshop => {

            // Check if workshop is a legit workshop
            if (!workshop) {
                return res.status(404).json({
                    msg: "Workshop not found."
                })
            }

            // Check if user is already registered
            else if (workshop.users.includes(req.params.userId)) {
                return res.status(400).json({
                    msg: "You are already registered."
                })
            }

            // Check if workshop has reached max limit
            else if (workshop.users.length >= workshop.maxUsers) {
                return res.status(400).json({
                    msg: "Unable to register. Workshop is full!"
                })
            }

            else {
                
                // Check if user is a legit user
                User.findOne({ _id: req.params.userId })
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({
                                msg: "User not found."
                            })
                        }

                        // Update workshops list in user
                        user.workshops.push(req.params.workshopId)
                        user.save();

                        // Update users list in workshop
                        workshop.users.push(req.params.userId);
                        workshop.save();
                        
                        return res.status(200).json({
                            success: true,
                            user: user,
                            workshop: workshop,
                            msg: "Successfully registered!"
                        })
                    })
                    .catch( err => {
                        console.log(err)
                        return res.status(400).json({
                            msg: "Unable to register. Please try again later."
                        })
                    })
            }
        })
        .catch( err => {
            console.log(err)
            return res.status(400).json({
                msg: "Unable to register. Please try again later."
            })
        })
})

/**
 * @route PUT api/workshops/deregister/:workshopId/:userId
 * @desc Deregister a user from a workshop
 * @access Private
 */
router.put('/deregister/:workshopId/:userId', (req, res) => {
    Workshop.findOne({ _id: req.params.workshopId })
    .then(workshop => {
        if (!workshop) {
            return res.status(404).json({
                msg: "Workshop not found."
            })
        }
        User.findOne({ _id: req.params.userId })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    msg: "User not found."
                })
            }

            // Check if user is registered in workshop
            else if (!workshop.users.includes(req.params.userId)) {
                return res.status(400).json({
                    msg: "User is not registered in workshop."
                })
            }

            // Remove user from workshop
            let userIndex = workshop.users.indexOf(req.params.userId);
            workshop.users.splice(userIndex, 1);
            workshop.save();

            // Remove workshop from user
            let workshopIndex = user.workshops.indexOf(req.params.workshopId);
            user.workshops.splice(workshopIndex, 1)
            user.save();

            return res.status(200).json({
                success: true,
                workshop: workshop,
                user: user,
                msg: "Deregistered!"
            })

        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})


/**
 * @route GET api/workshops/:id
 * @desc Return one workshop
 * @access Private
 */
// router.get('/:id', (req, res) => {
//     Workshop.findOne({ _id: req.params.id })
//         .then( workshop => {
//             if (!workshop) {
//                 return res.status(404).json({
//                     msg: "Workshop not found!"
//                 })
//             }
//             return res.status(200).json({
//                 workshop: workshop,
//                 success: true
//             })
//         })
//         .catch( err => {
//             console.log(err) 
//             return res.status(400).json({
//                 msg: "Unable to retrieve workshop. Please try again."
//             })
//         })
// })

module.exports = router;