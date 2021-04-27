const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/authentication');
const { authUser } = require('../controllers/userControllers.js');
const { getUserTasks } = require("../controllers/taskController")

// /me/:id
router.route('/:id').get(getUserTasks);


router.route('/auth').post(authentication, authUser); // full route path: /me/auth
module.exports = router;