const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/authentication');
const { authUser } = requiure('../controllers/taskController.js');
const { getUserTasks } = require('../controllers/taskController');


// /me 

router.route('/tasks').get(authentication, getUserTasks); // full route path: /me/tasks
router.route('/auth').post(authentication, authUser); // full route path: /me/auth
module.exports = router;