const User = require('../models/User');
const bcryptjs = require('bcryptjs');

// ADD
exports.addUser = async (req, res, next) => {
  const userData = req.body;
  try {

    const existingUserName = await User.findOne({userName: userData.userName})
    const existingEmail = await User.findOne({email: userData.email})
    if(existingUserName){
      let error = new Error(`${userData.userName} already exists`);
      error.status = 400; 
      next(error);
    }
    if(existingEmail){
      let error = new Error(`${userData.email} already exists`);
      error.status = 400; 
      next(error);
    }

    // Create the user and grab the user IDs
    const user = await User.create(userData);
    

    // Generate a token
    // const token = user.generateAuthToken();

    // // put the token in the response
    // res
    //   .cookie('token', token, {
    //     expires: new Date(Date.now() + 604800000),
    //     sameSite: process.env.NODE_ENV == 'production' ? 'None' : 'lax',
    //     secure: process.env.NODE_ENV == 'production' ? true : false, //http on localhost, https on production
    //     httpOnly: true,
    //   })
      res.json( {user});
  } catch (err) {
    next(err);
  }
};

// GET USER
exports.getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

// GET USERS
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// LOGIN USER
exports.loginUser = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
      // grab me a user from DB by email & password
      const userFound = await User.findOne({ userName});
  
      // handle user not found by given credentials
      if (!userFound) {
        let error = new Error(`Not found user with username ${userName}`);
        error.status = 401; 
        next(error);
      }

      const pwCompareResult = bcryptjs.compareSync(password, userFound.password);

      if(!pwCompareResult) {
        let error = new Error("Wrong password");
        error.status = 401; 
        next(error);
      }
  
      res.json(userFound);
    } catch (err) {
      next(err);
    }
  };

// DELETE USER
exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      let userDeleted = await User.findByIdAndDelete(id);
      if (!userDeleted) throw new Error();
      res.json(userDeleted);
    } catch (err) {
      let error = new Error(`Wrong ID: ${id}`);
      error.status = 400;
      next(error);
    }
};

// LOGOUT USER - TODO
// exports.logoutUser = async (req, res, next) => {
//     res.clearCookie('token', {
//       sameSite: process.env.NODE_ENV == 'production' ? 'None' : 'lax',
//       secure: process.env.NODE_ENV == 'production' ? true : false, //http on localhost, https on production
//       httpOnly: true,
//     }); // clear the cookie in the browser
//     res.json({ message: 'Logged you out successfully' });
//   };

// EDIT USER
exports.editUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      let editedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.json(editedUser);
    } catch (err) {
      next(err);
    }
};

// AUTHENTICATE USER

exports.authUser = (req, res) => {
    res.json(req.user);
  };
