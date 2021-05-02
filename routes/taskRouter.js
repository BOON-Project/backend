const express = require("express");
const router = express.Router();

const {
  getTask,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
<<<<<<< HEAD
} = require("../controllers/taskController");
//const { validateTask } = require('../middleware/validation');
=======
  getUserTasks
} = require('../controllers/taskController');
//const { validateTodo } = require('../middleware/validation');
>>>>>>> a0493c67a197ed0387523abdfd0228396650839c

// /task
router.route("/").get(getTasks).post(addTask);

// /task/:id
<<<<<<< HEAD
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);
=======
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);
>>>>>>> a0493c67a197ed0387523abdfd0228396650839c

module.exports = router;
