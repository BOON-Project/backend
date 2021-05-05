const customError = require("../helpers/customError");
const User = require("../models/User");

exports.authentication = async (req, res, next) => {
  try {
    //grab the token from request
    const token = req.headers.token;

    if (!token) return next(customError("No token found! Please Login"));

    // validate the received token

    try {
      const user = await User.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      // if the token is corrupted, then throw an unauthorized error
      return next(customError(error.message, 401));
    }

    //if token is not valid, then an error shows up
  } catch (error) {
    next(error);
  }
};
