const express = require("express");
const router = express.Router();

const {
    getMessagesbyTask,
    addMessage,
} = require("../controllers/messagesController");

// /messages
router.route("/").post(addMessage);

module.exports = router;
