const express = require("express");
const router = express.Router();
// const {   EXAMPLE FOR LATER
//   userValidationRules,
//   userValidationErrorHandling,
// } = require('../middleware/validation');
// const { auth } = require('../middleware/authentication');

const {
  getUser,
  addUser,
  editUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require("../controllers/usersControllers");

router.route("/").post(addUser);

// Route: /users/login
router.route("/login").post(loginUser);

// Route: /users/:id
router.route("/:id").get(getUser).put(editUser).delete(deleteUser);

module.exports = router;
