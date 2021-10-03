const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    //Declare errors object
    let errors = {};

    //Convert empty fields to empty string to be used for validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Username check
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required.";
    };

    //Password check
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required."
    };

    return {
        errors,
        isValid: isEmpty(errors) //valid if errors object is empty
    };
};