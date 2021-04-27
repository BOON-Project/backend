const customError = require("../helpers/customError");
const User = require('../models/User');

exports.authentication = async(req, res, next)=>{
    try {
        
        //gonna use cookies in future!
        const token = req.cookies.token;

        //then we validate cookie. next search user with that COOKIE
        const user = await User.findByToken(token);

        console.log("token", token, "user", user);
        //if token is not valid, then an error shows up
        if(!user) next(customError("Cannot validate"));

        //if token is valid, we're ready to go =>
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
}