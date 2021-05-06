const express = require("express");
const router = express.Router();
// const {   EXAMPLE FOR LATER
//   userValidationRules,
//   userValidationErrorHandling,
// } = require('../middleware/validation');
const { authentication } = require("../middleware/authentication");
const {
  userValidationRules,
  userValidationErrorHandling,
} = require("../middleware/validation");

const {
  addUser,
  getUsers,
  getUser,
  loginUser,
  deleteUser,
  editUser,
} = require("../controllers/userControllers");

router
  .route("/")
  .get(getUsers)
  .post(userValidationRules(), userValidationErrorHandling, addUser);

// Route: /user/login
router.route("/login").post(loginUser);

// Route: /user/:id
router.route("/:id").get(getUser).put(editUser).delete(deleteUser);

module.exports = router;
