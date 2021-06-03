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
        location: { type: Object, default: { latitude: 0, longitude: 0 } },

        avatar: {
            type: String,
            default: "/images/BoonAvatar.svg",
        },
        bio: { type: String, min: 20, max: 300, default: "" },
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
        boons: { type: Number },
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

// Birthday virtual to beautify Date

UserSchema.virtual("BDay").get(function () {
    const date = this.birthday;
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    if (d < 10) {
        d = "0" + d;
    }
    if (m < 10) {
        m = "0" + m;
    }

    return `${y}-${m}-${d}`;
});

// adding 5 max length for skills array

UserSchema.pre("validate", function (next) {
    if (this.skills.length > 5) throw "skills exceeds maximum array size (5)!";
    next();
});

const UserResultSchema = new Schema({
    avgRating: Number,
});

UserSchema.pre("save", function () {
    const user = this;
    // convert plain password to password hash (but ONLY if password was modified)
    console.log("passw before", user);
    if (user.isModified("password")) {
        console.log("passw after");
        user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds
    }
});

// GENERATE TOKEN

UserSchema.methods.generateAuthToken = function () {
    console.log(this);
    const user = this;
    const token = jwt
        .sign({ _id: user._id.toString() }, ourSuperSecretKey, {
            expiresIn: "24h",
        })
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
