  
const express = require('express');
const router = express.Router();
// const {   EXAMPLE FOR LATER
//   userValidationRules,
//   userValidationErrorHandling,
// } = require('../middleware/validation');
const { authentication } = require('../middleware/authentication');

const {
  addUser,
  getUser,
  loginUser,
  deleteUser,
  editUser,
 // logoutUser,
} = require('../controllers/usersControllers');


router.route('/').post( addUser );

// Route: /user/login
router.route('/login').post( authentication, loginUser);

// Route: /user/:id
router.route('/:id').get( authentication, getUser ).put( authentication, updateUser ).delete( deleteUser );

module.exports = router;