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

const { getMessagesbyTask,addMessagesbyTask } = require("../controllers/messagesController");
//const { validateTodo } = require('../middleware/validation');

// /tasks
router.route("/").get(getTasks).post(addTask);

// /tasks/:id
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

router.route("/:id/messages").get(getMessagesbyTask);
router.route("/:id/messages").post(addMessagesbyTask);
module.exports = router;
