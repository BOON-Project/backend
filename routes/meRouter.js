const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const { authUser } = require("../controllers/userControllers.js");
const {
    getUserTasks,
    getUserTasksOffered,
    getUserTasksReceived,
} = require("../controllers/taskController");

// /me
router.route("/offered").get(authentication, getUserTasksOffered);
router.route("/received").get(authentication, getUserTasksReceived);
// me/offered/:id
// router.route("/offered/:id").patch(authentication, editUserTaskOffered);
// router.route("/received/:id").patch(authentication, editUserTaskReceived);

router.route("/auth").post(authentication, authUser); // full route path: /me/auth
module.exports = router;
