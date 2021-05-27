const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//const env = require('../config/config'); for the key later if we wanna use jwt

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Skill = model("Skill", SkillSchema);

module.exports = Skill;
