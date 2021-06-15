const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//const env = require('../config/config'); for the key later if we wanna use jwt

const MessagesSchema = new Schema(
  {
    task: { type: Schema.Types.ObjectId, required: true, ref: "Task" },
    msg: { type: String, required: true },
    senderId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Messages = model("Messages", MessagesSchema);

module.exports = Messages;
