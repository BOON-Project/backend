const express = require("express");
const router = express.Router();

const {
  getTask,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getUserTasks,
} = require("../controllers/taskController");

const { getMessagesbyTask } = require("../controllers/messagesController");
//const { validateTodo } = require('../middleware/validation');

// /tasks
router.route("/").get(getTasks).post(addTask);

// /tasks/:id
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

router.route("/:id/messages").get(getMessagesbyTask);

module.exports = router;
