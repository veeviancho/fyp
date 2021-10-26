//Import express router
const express = require('express');
const router = express.Router();

//Load workshop model
const Workshop = require('../../model/Workshop')

/**
 * @route POST api/workshops/create
 * @desc Create new workshop
 * @access Private
 */
router.post('/create', (req, res) => {
    const newWorkshop = new Workshop({
        title: req.body.title,
        description: req.body.description,
    });
    newWorkshop
        .save()
        .then(workshop => res.json({
            workshop: workshop,
            success: true
        }))
        .catch(err => console.log(err));
})

// studentRoute.route('/create-student').post((req, res, next) => {
//     StudentModel.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
//   });


/**
 * @route GET api/workshops/all
 * @desc Return all workshops
 * @access Private
 */
router.get('/all', (req, res) => {
    Workshop.find({})
    .then( (workshop) => {
        res.status(201).json({
            workshop: workshop,
            success: true
        })
    })
})

module.exports = router;