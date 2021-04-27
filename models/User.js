const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcryptjs = require('bcryptjs');
//const env = require('../config/config'); for the key later if we wanna use jwt

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, default: '/statics/avatar.png' }
},
{
    versionKey: false,
    timestamps: true,
});


UserSchema.pre('save', function () {
    const user = this;
    // convert plain password to password hash (but ONLY if password was modified)
    if (user.isModified('password')) {
      user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds
    }
  });


const User = model("User", UserSchema);

module.exports = User;

