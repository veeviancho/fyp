// Import express router and User model
const express = require('express');
const router = express.Router();
const User = require('../../model/User');

/**
 * @route GET api/members/all
 * @desc Return all users
 * @access Private (admin)
 */
router.get('/all', (req, res) => {
    User.find({})
        .then( users => {
            if (!users) {
                return res.status(404).json({
                    msg: "No user available."
                })
            }
            return res.status(201).json({
                users: users,
                success: true
            })
        })
        .catch( err => {
            console.log(err)
        })
})

//Export router
module.exports = router;