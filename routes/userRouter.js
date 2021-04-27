  
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
} = require('../controllers/userControllers');


router.route('/').post( addUser );

// Route: /user/login
router.route('/login').post( authentication, loginUser);

// Route: /user/:id
router.route('/:id').get( authentication, getUser ).put( authentication, editUser ).delete( deleteUser );

module.exports = router;