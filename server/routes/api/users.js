require('dotenv').config()

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
//Load workshop model
const Workshop = require('../../model/Workshop')

//Load input validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

//Load keys
const keys = require('../../config/keys');

//For email verification
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Token = require('../../model/Token');

/** 
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */ 
router.post('/register', (req, res) => {
    // //Object restructuring
    // const { error, isValid } = validateRegisterInput(req.body);
    
    // //Validation check
    // if (!isValid) {
    //     return res.status(400).json(error);
    // };

    // Name Input Validation
    // Accepts lower/uppercase letters, space and special char (,.'-) only
    // First char must be a letter
    let check = /^[a-z]+[a-z ,.'-]*$/i;
    if (!check.test(req.body.name)) {
        return res.status(400).json ({
            msg: "Please enter a valid name.",
            info: [
                { msg: "First character must be an alphabet letter." },
                { msg: "Numbers are not accepted." }, 
                { msg: "Special characters other than space ( ), comma (,), period (.), hyphen (-) and apostrophe (') are not accepted." }
            ]
        })
    }

    // Username Input Validation
    // Accepts any word character [A-Za-z0-9], special char (.-_) only
    // No more than one special char in a row
    // Cannot begin or end with a special char
    // 3-25 characters long
    check = /^\w{1}([\w]*[.\-_]?){1,25}\w{1}$/i;
    if (!check.test(req.body.username)) {
        return res.status(400).json ({
            msg: "Please enter a valid username.",
            info: [
                { msg: "Accept alphabet letters, numbers, period (.), hyphen (-) and underscore (_) only." },
                { msg: "No more than one special character in a row." },
                { msg: "Cannot begin or end with a special character." },
                { msg: "3 to 25 characters long." }
            ]
        });
    }

    // Email Input Validation (must be NTU email account)
    // Accepts @e.ntu.edu.sg or @ntu.edu.sg
    // First part (before '@') accepts any letter/number, special char (.-) only
    // Cannot start with number or special character (only starts with alphabet letter)
    // No more than one special char in a row
    check = /^[a-z]+[\w(-.)?]*@(e.)?ntu.edu.sg$/i
    if (!check.test(req.body.email)) {
        return res.status(400).json ({
            msg: "Please enter a valid NTU email.",
            info: [
                { msg: "Must be an NTU email account." },
                { msg: "Username accepts any letters, numbers, period (.) and hyphen (-) only." },
                { msg: "Cannot begin with a number or special character." },
                { msg: "No more than one special character in a row." }
            ]
        });
    }

    // Password Input Validation
    // Medium: At least one (uppercase, lowercase, number) and at least 6 characters
    // Only checking for medium strength
    // Strong: At least one (uppercase, lowercase, number, special char) and at least 8 characters
    // check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})|(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/
    check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/
    if (!(check.test(req.body.password))) {
        return res.status(400).json ({
            msg: "Weak password.",
            info: [
                { msg: "At least one uppercase letter." },
                { msg: "At least one lowercase letter." },
                { msg: "At least one number." },
                { msg: "At least 6 characters." }
            ]
        })
    }

    // Confirm Password Input Validation
    if (req.body.password !== req.body.password2) {
        return res.status(400).json({
            msg: "Passwords do not match."
        })
    }

    // Search Database if Email and Username already exist
    User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}] }).then(user => {
        //Unique email and username check
        if (user) {
            if (user.username === req.body.username) {
                return res.status(400).json({
                    msg: "Username is already taken."
                });
            } else {
                return res.status(400).json({
                    msg: "Email already exists. Please login now."
                });
            };  
        } else {
            // Add user into Database
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                programme: req.body.programme,
                about: ''
            });
        
            //Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            // Email verification
                            const token = new Token({
                                _userId: newUser._id,
                                token: crypto.randomBytes(16).toString('hex')
                            });

                            token.save((err) => {
                                if (err) {
                                    return res.status(400).json({
                                        msg: "Unable to send link."
                                    })
                                }

                                let transporter = nodemailer.createTransport({
                                    service: 'Gmail',
                                    auth: {
                                        type: 'OAuth2',
                                        user: process.env.MAIL_USERNAME,
                                        pass: process.env.MAIL_PASSWORD,
                                        clientId: process.env.OAUTH_CLIENTID,
                                        clientSecret: process.env.OAUTH_CLIENT_SECRET,
                                        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                                        accessToken: process.env.OAUTH_ACCESS_TOKEN
                                    }
                                });

                                const url = 'http:\/\/' + req.headers.host + '\/api\/users\/confirmation\/' + newUser.email + '\/' + token.token;

                                let mailOptions = {
                                    from: 'EEE Lifelong Learning Space' + '<' + process.env.MAIL_USERNAME + '>',
                                    to: newUser.email,
                                    subject: 'Account Verification Link', 
                                    text: 'Hello ' + req.body.name + ',\n\n' + 'You are receiving this email because you have recently signed up for an account in the EEE Lifelong Learning Space web platform.' + '\n\n' + 'Please verify your account by clicking the link:\n' + url + '\n\nThank you!\n',
                                }

                                transporter.sendMail(mailOptions, (err) => {
                                    if (err) {
                                        console.log(err)
                                        return res.status(400).json({
                                            msg: "Unable to send link to " + newUser.email + "."
                                        })
                                    }
                                    return res.status(200).json({
                                        msg: "User successfully registered! A verification email has been sent to " + newUser.email,
                                        user: user,
                                        success: true
                                    })
                                })
                            })
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


/** 
 * @route POST api/users/login
 * @desc Login user and return JWT token
 * @access Public
 */
router.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        //Check if user exists
        if (!user) {
            return res.status(404).json({ 
                msg: "User not found."
            })
        }

        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {

            // Password match
            if (isMatch) {

                //Check if email is confirmed
                if (!user.isVerified) {
                    return res.status(404).json({
                        verify_error: true,
                        msg: "Please confirm your email by clicking on the link sent to you."
                    })
                }

                //Creates JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                }
                //Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 86400000 //seconds
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
            
            // Password does not match
            } else {
                return res.status(400).json({ 
                    msg: "You have entered an incorrect password." 
                });
            }
        });
    });
});

/**
 * @route POST api/users/profile
 * @desc Return user's data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ 
        user: req.user 
    });
});

/**
 * @route PUT api/users/update/:id
 * @desc Update user's data
 * @access Private
 */

//TODO: passport authenticate??
router.put('/update/:id', (req, res) => {

    // Name Input Validation
    if (req.body.name) {
        let check = /^[a-z]+[a-z ,.'-]*$/i;
        if (!check.test(req.body.name)) {
            return res.status(400).json ({
                msg: "Please enter a valid name."
            })
        }
    }

    // Username Input Validation
    if (req.body.username) {
        check = /^\w{1}([\w][.-_]?){3,23}\w{1}$/i;
        if (!check.test(req.body.username)) {
            return res.status(400).json ({
                msg: "Please enter a valid username."
            });
        }
    }

    // Admin - change email
    if (req.body.email) {
        // Email Input Validation
        check = /^[a-z]+[\w(-.)?]*@(e.)?ntu.edu.sg$/i
        if (!check.test(req.body.email)) {
            return res.status(400).json ({
                msg: "Please enter a valid NTU email.",
            });
        }

        // Check if email exists
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json({
                    msg: "Email address is already taken."
                })
            }
        })
    }

    User.findOne({ username: req.body.username }).then(user => {
        //Check if user exists
        if (user) {
            return res.status(400).json({ 
                msg: "Username is already taken."
            })
        } else {
            User.updateOne({ _id: req.params.id }, { $set: req.body })
                .then( () => {
                    res.status(201).json({
                        success: true,
                        msg: 'Profile updated successfully!'
                    });
                })
                .catch( (err) => {
                    console.log(err)
                    res.status(400).json({
                        msg: "Unable to update. Please try again later."
                    });
                })
        }
    })
});

/**
 * @route GET api/users/confirmation/:email/:token
 * @desc Registration email verification
 * @access Private
 */
router.get('/confirmation/:email/:token', (req, res) => {

    Token.findOne({ token: req.params.token }).then(token => {

        // If token has expired (and has been deleted from database)
        if (!token) {
            console.log('No user found');
            // return res.status(400).json({
            //     msg: "Your verification link may have expired. Please click on resend to receive a new link."
            // })

        } else {
            User.findOne({ _id: token._userId, email: req.params.email }).then(user => {
                // If link is invalid
                if (!user) {
                    console.log('No user is associated with the link. Please register for an account.')
                    // return res.status(401).json({
                    //     msg: "No user is associated with the link. Please register for an account."
                    // })
                
                // If user is already verified
                } else if (user.isVerified) {
                    console.log('User is already verified. Please proceed to login.')
                    // return res.status(200).json({
                    //     msg: "User is already verified. Please proceed to login."
                    // })
                
                // Verify user
                } else {
                    user.isVerified = true;
                    user.save( (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('User is successfully verified. Please proceed to login.')
                            // return res.status(201).json({
                            //     success: true,
                            //     msg: "User is successfully verified. Please proceed to login."
                            // })
                        }
                    })

                }
            })
        }
    })

    res.redirect('http://localhost:8080/login');
    return;

    // return res.redirect("http://localhost:8080/login")
})

/**
 * @route POST api/users/resend/:email
 * @desc Resend email verification link
 * @access Private
 */
router.post('/resend/:email', (req, res) => {
    User.findOne({ email: req.params.email }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "User not found."
            })
        } else {
            const token = new Token({
                _userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            })
            token.save(err => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        msg: "Unable to send! Please try again."
                    })
                }
                
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        type: 'OAuth2',
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                        clientId: process.env.OAUTH_CLIENTID,
                        clientSecret: process.env.OAUTH_CLIENT_SECRET,
                        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                        accessToken: process.env.OAUTH_ACCESS_TOKEN
                    }
                })

                const url = 'http:\/\/' + req.headers.host + '\/api\/users\/confirmation\/' + user.email + '\/' + token.token;

                let mailOptions = {
                    from: 'EEE Lifelong Learning Space' + '<' + process.env.MAIL_USERNAME + '>',
                    to: user.email,
                    subject: "Account Verification Link", // Subject line
                    text: 'Hello ' + user.name + ',\n\n' + 'You are receiving this email because you have recently signed up for an account in the EEE Lifelong Learning Space web platform.' + '\n\n' + 'Please verify your account by clicking the link:\n' + url + '\n\nThank you!\n',
                };

                transporter.sendMail(mailOptions, (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).json({
                            msg: "Unable to send! Please try again."
                        })
                    }
                    return res.status(200).json({
                        success: true,
                        msg: "A verification email has been sent to " + user.email
                    })
                })
            })
        }

    })
})

/**
 * @route GET api/users/all
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

/**
 * @route DELETE api/users/delete/:id
 * @desc Delete user by ID
 * @access Private (admin)
 */
router.delete('/delete/:id', (req, res) => {
    const userId = req.params.id

    User.findOneAndDelete( { _id: userId } )
        .then(user => {

            // Remove user from workshop
            for (let i=0; i<user.workshops.length; i++) {
                let workshopId = user.workshops[i]
                Workshop.findOne({ _id: workshopId }).then(workshop => {
                    let index = workshop.users.indexOf(userId)
                    if (index > -1) {
                        workshop.users.splice(index, 1)
                        workshop.points -= 1
                    }
                    workshop.save()
                })
                .catch(err => {
                    console.log(err)
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
})

/**
 * @route GET api/users/get/:username
 * @desc Return user by username
 * @access Private
 */
router.get('/get/:username', (req, res) => {
    User.findOne({ username: req.params.username })
        .then( user => {
            if (!user) {
                return res.status(404).json({
                    msg: "User not found!"
                })
            }
            return res.status(200).json({
                user: user,
                success: true
            })
        })
        .catch( err => {
            console.log(err) 
            return res.status(400).json({
                msg: "Unable to retrieve user. Please try again."
            })
        })
})

/**
 * @route api/users/findEmail/:email
 * @desc Send code to user's email
 * @access Public
 */
router.get('/findEmail/:email', (req, res) => {
    const email = req.params.email;
    User.findOne({ email })
    .then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Email not found. Please register for an account."
            })
        } else {
            const token = new Token({
                _userId: user._id,
                token: crypto.randomBytes(3).toString('hex').toUpperCase()
            })
            token.save(err => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        msg: "Unable to send! Please try again."
                    })
                }

                // Send email
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        type: 'OAuth2',
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                        clientId: process.env.OAUTH_CLIENTID,
                        clientSecret: process.env.OAUTH_CLIENT_SECRET,
                        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                        accessToken: process.env.OAUTH_ACCESS_TOKEN
                    }
                })

                const code = token.token;

                let mailOptions = {
                    from: 'EEE Lifelong Learning Space' + '<' + process.env.MAIL_USERNAME + '>',
                    to: user.email,
                    subject: "Reset Password Code", // Subject line
                    text: 'Hello ' + user.name + ',\n\n' + 'You are receiving this email because you have recently requested for a password reset in the EEE Lifelong Learning Space web platform.' + '\n\n' + 'Please enter the code below to reset your password:\n' + code + '\n\nThank you!\n',
                };

                transporter.sendMail(mailOptions, (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).json({
                            msg: "Error encountered. Please try again later."
                        })
                    } 
                    return res.status(200).json({
                        success: true,
                        user: user
                    })
                })
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
})

/**
 * @route api/users/verifyCode/:code/:userId
 * @desc Verify code
 * @access Private
 */
router.get('/verifyCode/:code/:userId', (req, res) => {
    // console.log(req.params.code)
    Token.findOne({ token: req.params.code })
    .then(token => {
        if (!token) {
            console.log('Token not found');
        } else {
            if (token._userId != req.params.userId) {
                return res.status(400).json({
                    msg: "Invalid code entered."
                })
            }
            return res.status(200).json({
                success: true,
                token: token
            })
        }
    })
    .catch(err => console.log(err))
})

/**
 * @route api/users/resetPW/:userId
 * @desc Reset Password
 * @access Private
 */

router.put('/resetPw/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then(user => {
            if (!user) {
                console.log('No user found')
            } else {
                let password = req.body.password
                let password2 = req.body.password2

                if (password !== password2) {
                    return res.status(400).json({
                        msg: "Passwords do not match."
                    })
                }

                check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/
                if (!(check.test(password))) {
                    return res.status(400).json ({
                        msg: "Weak password.",
                        info: [
                            { msg: "At least one uppercase letter." },
                            { msg: "At least one lowercase letter." },
                            { msg: "At least one number." },
                            { msg: "At least 6 characters." }
                        ]
                    })
                }
                
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                        .then(() => {
                            return res.status(200).json({
                                success: true
                            })
                        })
                        .catch(err => console.log(err))
                    })
                })
            }
        })
        .catch(err => console.log(err))
    })

//Export router to be used elsewhere
module.exports = router;