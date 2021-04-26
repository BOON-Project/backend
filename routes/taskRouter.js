const express = require('express');
const router = express.Router();

const {
  getTask,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/todosControllers');
//const { validateTodo } = require('../middleware/validation');

// /tasks
router.route('/').get( getTasks ).post( addTask );

// /tasks/:id

router.route('/:id').get( getTask ).put( updateTask ).delete( deleteTask );

module.exports = router;