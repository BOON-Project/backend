const express = require("express");
const router = express.Router();

const {
    getMessagesbyTask,
    addMessage,
} = require("../controllers/messagesController");

// /skill/:id
router.route("/").post(addMessage);

module.exports = router;
