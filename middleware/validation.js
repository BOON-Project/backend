//const customError = require("../helpers/customError")
const User = require("../models/User")
const {body, validationResult} = require('express-validator')
const customError = require('../helpers/customError');

exports.validateTask = (req, res, next) =>{
    console.log("hi from middleware", req.body);
    const task = req.body;
    if(
        task.skill &&
        task.boons &&
        task.message &&
        task.status &&
        task.date &&
        task.boonee &&
        task.booner
        )
        next();
    else{
        //if NOT, an error will be displayed
        const error = new Error('your task is missing something');
        error.status = 400;
        next(error);
    }
};

//user validation & sanitization
//bunch of user's rules

exports.userValidationRequirements = ()=>{
    return[
        body('email')
        .trim()
        .isEmail()
        .withMessage("Your Email does not match")
        .normalizeEmail(),
        body('password')
        .isLength({min:8})
        .withMessage("Your password is not safe")
        .bail()
        .custom((value)=>{
      //value is password in the body
        // * Passwords must be
        // * - At least 8 characters long, max length anything
        // * - Include at least 1 lowercase letter
        // * - 1 capital letter
        // * - 1 number
        // * - 1 special character => !@#$%^&*
        const regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        //returns a boolean
        const res = regex.test(value);
        return res;
        })
        .withMessage("Password needs more characters, 1 lowercase, 1 uppercase, 1 number and 1 special character"),
        body('firstName').trim(),
        body('lastName').trim(),
        body('userName').trim(),
    ];
};


//error handling IF userValidation fails
exports.userValidationErrorHandling = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())
    return next();

    const loadErrors = errors.array();
    const mergeErrors = mergeErrors(loadErrors);

    next(customError(mergeErrors, 422));
}

//client needs errors as strings,
//needs to be checked!!!!
const allErrors = (loadErrors) => {
    return loadErrors.map((error) => `${error.param}: ${error.msg}`).join('. ');
  };