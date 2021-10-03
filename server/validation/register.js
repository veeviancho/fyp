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

    //Name check
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required."
    }

    //Username check
    if (validator.isEmpty(data.username)) {
        errors.username = "Username field is required."
    }

    //Email check
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required."
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid."
    }

    //Password check
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required."
    } else if (!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be between 6 to 30 characters."
    }

    //Confirm Password check
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required."
    } else if (!validator.equals(data.password2, data.password)) {
        errors.password2 = "Passwords do not match."
    }

    return {
        errors,
        isValid: isEmpty(errors) //valid if errors object is empty
    };
};