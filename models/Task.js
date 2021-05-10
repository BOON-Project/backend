const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//const env = require('../config/config'); for the key later if we wanna use jwt

const TaskSchema = new Schema(
	{
		skill: { type: Schema.Types.ObjectId, ref: "Skill" },
		boons: { type: Number, required: true },
		message: { type: String, required: true, max: 400 },
		status: { type: String, default: "pending" },
		date: { type: Date, required: true },
		boonee: { type: Schema.Types.ObjectId, ref: "User" },
		booner: { type: Schema.Types.ObjectId, ref: "User" },
		rating: { type: Number, required: false, default: 0 },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Task = model("Task", TaskSchema);

module.exports = Task;
