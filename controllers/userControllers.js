const User = require('../models/User');

// ADD
exports.addUser = async (req, res, next) => {
    const info = req.body;
    try {
      const user = await User.create(info);
      res.json(user);
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

// LOGIN USER
exports.loginUser = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
      // grab me a user from DB by email & password
      const userFound = await User.findOne({ userName, password });
  
      // handle user not found by given credentials
      if (!userFound) {
        let error = new Error('Not found this user, my friend. Try again...');
        error.status = 401; // Unauthorized
        next(error); // forward my custom error to central error handler
      }
  
      res.json(userFound);
    } catch (err) {
      next(error);
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