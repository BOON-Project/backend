const Task = require("../models/Task");
const Messages = require("../models/Messages");

// GET MESSAGES ASSOCIATED WITH TASK ID
exports.getMessagesbyTask = async (req, res, next) => {
  console.log(req.params);
  const id = req.params.id;

  const taskMessages = await Messages.find({ task: id })
    .populate("senderId")
    .populate("receiverId");

  res.json(taskMessages);
};

exports.addMessage = async (req, res, next) => {
  const info = req.body;
  try {
    const message = await Messages.create(info);
    res.json(message);
  } catch (err) {
    next(err);
  }
};
