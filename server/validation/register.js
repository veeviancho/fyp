const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    //Declare errors object
    let errors = {};

    //Convert empty fields to empty string to be used for validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.programme = !isEmpty(data.programme) ? data.programme : "";

    //Name check
    if (validator.isEmpty(data.name)) {
        error = "Name field is required."
    }

    //Username check
    if (validator.isEmpty(data.username)) {
        error = "Username field is required."
    }

    //Email check
    if (validator.isEmpty(data.email)) {
        error = "Email field is required."
    } else if (!validator.isEmail(data.email)) {
        error = "Email is invalid."
    }

    //Password check
    if (validator.isEmpty(data.password)) {
        error = "Password field is required."
    } else if (!validator.isLength(data.password, {min: 6, max: 30})) {
        error = "Password must be between 6 to 30 characters."
    }

    //Confirm Password check
    if (validator.isEmpty(data.password2)) {
        error = "Confirm password field is required."
    } else if (!validator.equals(data.password2, data.password)) {
        error = "Passwords do not match."
    }

    return {
        error,
        isValid: isEmpty(error) //valid if errors object is empty
    };

    //code snippet from routes/api/users.js
        // User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}] }).then(user => {
    //     //Unique email and username check
    //     if (user) {
    //         if (user.username === req.body.username) {
    //             return res.status(400).json({
    //                 error: "Username is already taken."
    //             });
    //         } else {
    //             return res.status(400).json({
    //                 error: "Email already exists."
    //             });
    //         };  
    //     } else {
    //         const newUser = new User({
    //             name: req.body.name,
    //             username: req.body.username,
    //             email: req.body.email,
    //             password: req.body.password,
    //             programme: req.body.programme
    //         });

    //         //Hash password before saving in database
    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                 if (err) throw err;
    //                 newUser.password = hash;
    //                 newUser
    //                     .save()
    //                     .then(user => res.json({
    //                         user: user,
    //                         success: true,
    //                         // error: "User successfully registered!"
    //                     }))
    //                     .catch(err => console.log(err));
    //                 });
    //             });
    //     };
    // }); 
};