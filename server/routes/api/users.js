//Import express router
const express = require('express');
const router = express.Router();

//To hash passwords
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//To protect our routes
const passport = require('passport');

//Load user model
const User = require('../../model/User');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load keys
const keys = require('../../config/keys')

// @route POST api/users/register
// @desc Register the user
// @access Public
router.post('/register', (req, res) => {
    //Object restructuring
    const { errors, isValid } = validateRegisterInput(req.body);
    
    //Validation check
    if (!isValid) {
        return res.status(400).json(errors);
    };

    User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}] }).then(user => {
        //Unique email and username check
        if (user) {
            if (user.username === req.body.username) {
                return res.status(400).json({
                    username: "Username is already taken."
                });
            } else {
                return res.status(400).json({
                    email: "Email already exists."
                });
            };  
        } else {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            //Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                });
        };
    }); 
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    //Object restructuring
    // const { errors, isValid } = validateLoginInput(req.body);

    // //Validation check
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // };

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }).then(user => {
        //Check if user exists
        if (!user) {
            return res.status(404).json({ usernotfound: "User not found."})
        }

        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            //Password match, creates JWT Payload
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                }
                //Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 1200 // 20 minutes in seconds
                    },
                    (err, token) => {
                        res.json({
                            // api - sent to client side
                            success: true,
                            user: user,
                            token: 'Bearer ' + token
                        });
                    }
                )
            } else {
                return res.status(400).json({ passwordIncorrect: "Incorrect Password" });
            }
        });
    });
});

//Export router to be used elsewhere
module.exports = router;