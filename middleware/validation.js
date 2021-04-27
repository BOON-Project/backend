const {body, validationResult} = require('express-validator')

/* exports.validateTask = (req, res, next) =>{
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
}; */

//user validation & sanitization
exports.userValidationRules = ()=>{
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
        const regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        const res = regex.test(value);
        return res;
        })
        .withMessage("Password needs more characters, 1 lowercase, 1 uppercase, 1 number and 1 special character"),
        body('firstName').trim(),
        body('lastName').trim(),
        body('userName').trim(),
    ];
};

const mergeErrors = (loadErrors) => {
    return loadErrors.map((error) => `${error.param}: ${error.msg}`).join('. ');
  };

//error handling IF userValidation fails
exports.userValidationErrorHandling = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())
    return next();

    const loadErrors = errors.array();
    const mergedErrors = mergeErrors(loadErrors);

    let error = new Error(mergedErrors);
    error.status = 422; 
    next(error);
}

