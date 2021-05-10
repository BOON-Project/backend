const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/config");

// JWT Secret to create and validate tokens
const ourSuperSecretKey = env.jwtSecret;
console.log(ourSuperSecretKey);

const UserSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		userName: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		birthday: { type: Date, required: true },
		password: { type: String, required: true },
		avatar: { type: String, required: false, default: "/statics/avatar.png" },
		skills: [
			{
				_id: false,
				skillID: {
					type: Schema.Types.ObjectId,
					ref: "Skill",
				},
				boons: Number,
			},
		],
		rating: { type: Number, default: 0 },
		boons: { type: Number, required: false },
	},
	{
		versionKey: false,
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (docOriginal, docToReturn) => {
				delete docToReturn.password;
			},
		},
	}
);

const UserResultSchema = new Schema({
	avgRating: Number,
});

UserSchema.pre("save", function () {
	const user = this;
	// convert plain password to password hash (but ONLY if password was modified)
	if (user.isModified("password")) {
		user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds
	}
});

// GENERATE TOKEN

UserSchema.methods.generateAuthToken = function () {
	console.log(this);
	const user = this;
	const token = jwt
		.sign({ _id: user._id.toString() }, ourSuperSecretKey, { expiresIn: "3h" })
		.toString();

	return token;
};

// FIND BY TOKEN

UserSchema.statics.verifyToken = function (token) {
	let decodedUser = jwt.verify(token, ourSuperSecretKey);
	console.log(`decoded`, decodedUser);
	return decodedUser;
};

const User = model("User", UserSchema);

module.exports = User;
