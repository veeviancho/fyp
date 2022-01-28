// Import express router
const { response } = require('express');
const express = require('express');
const router = express.Router();

// Load article model
const About = require('../../model/About')

/**
 * @route POST api/about/create
 * @desc Create a template for the About page
 */
router.post('/create', (req, res) => {
    const newAbout = new About({
        title: 'about',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Lacus vel facilisis volutpat est velit egestas. Et netus et malesuada fames.',
        aboutDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Lacus vel facilisis volutpat est velit egestas. Et netus et malesuada fames.',
        openingHours: {
            'Mon-Fri': '8:30AM - 9:30PM',
            'Sat': '8:30AM - 5PM',
            'Sun': 'CLOSED'
        },
        address: '50 Nanyang Ave, 639798 Singapore',
        getHere: {
            'By Car': 'The university is flanked by the PIE to the south and Jalan Bahar to the east. There are two entrances when travelling via the PIE, take either the Jalan Bahar entrance (Exit 36) or the Pioneer North entrance (Exit 38).',
            'By Bus': 'Service 179 & 199: Both services depart from Boon Lay Bus Interchange (next to Boon Lay MRT Station) to the University. The services ply from 0600-2400 hrs on weekdays and Saturdays, and from 0630-0020hrs on Sundays and Public Holidays.',
            'By NTU Shuttle Bus Service': 'Campus Rider is a free shuttle bus service to and from Pioneer MRT station.'
        },
        imageLink: 'https://static.dezeen.com/uploads/2017/06/dezeen-features-haworth-office-culture_dezeen_2364_col_12-852x522.jpg'
    });
    newAbout
        .save()
        .then(about => {
            return res.json({
                about: about,
                success: true
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                msg: "Unable to post template. Please try again."
            })
        })
})

/**
 * @route POST api/about/create/contact
 * @desc Create new contact
 * @access Private
 */
router.post('/create/contact', (req, res) => {
    const newContact = new About({
        title: 'contact',
        contact: {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            seen: false
        }
    })
    newContact
        .save()
        .then(about => {
            return res.status(201).json({
                about: about,
                success: true
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                msg: "Unable to send message at the moment. Please try again later."
            })
        })
})

/**
 * @route GET api/about/read
 * @desc Read about
 * @access Public
 */
router.get('/read', (req, res) => {
    About.find({ title: 'about' })
    .then(about => {
        if (!about) {
            return res.status(404).json({
                msg: "Create about template first."
            })
        }
        return res.status(201).json({
            about: about,
            success: true
        })
    })
    .catch(err => {
        console.log(err)
    })
})

/**
 * @route GET api/about/contact/read
 * @desc Read contact
 * @access Private (admin)
 */
router.get('/contact/read', (req, res) => {
    About.find({ title: 'contact' })
    .then(message => {
        if (!message) {
            return res.status(404).json({
                msg: "No messages found."
            })
        }
        return res.status(201).json({
            message: message,
            success: true
        })
    })
    .catch(err => {
        console.log(err)
    })
})

/**
 * @route PUT api/about/update
 * @desc Update about
 * @access Private (admin)
 */
router.put('/update', (req,res) => {
    let edits = {
        description: req.body.description,
        aboutDesc: req.body.aboutDesc,
        openingHours: req.body.openingHours,
        address: req.body.address,
        getHere: req.body.getHere,
        imageLink: req.body.imageLink
    }
    About.findOneAndUpdate({ title: "about" }, { $set: edits })
        .then(about => {
            if (!about) {
                return res.status(404).json({
                    msg: "No entry found!"
                })
            }
            return res.status(200).json({
                success: true,
                about: about
            })
            
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                msg: "Encountered an error. Unable to update! Please try again later."
            })
        })
})

/**
 * @route DELETE api/about/delete/:id
 * @desc Delete about
 * @access Private (admin)
 */
router.delete('/delete/:id', (req, res) => {
    About.findOneAndDelete({ _id: req.params.id })
        .then(message => {
            if (!message) {
                return res.status(404).json({
                    msg: "Message not found!"
                })
            }
            return res.status(200).json({
                success: true,
                msg: "Deleted successfully!"
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                msg: "Unable to delete! Please try again later."
            })
        })
})

module.exports = router;