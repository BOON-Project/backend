const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/authentication');
const { authUser } = require('../controllers/userControllers.js');

// /me 

router.route('/auth').post(authentication, authUser); // full route path: /me/auth
module.exports = router;