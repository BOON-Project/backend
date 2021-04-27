const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/config');
const ourSuperSecretKey = env.jwt_key;


const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, default: '/statics/avatar.png' }
},
{
    versionKey: false,
    timestamps: true,
});

// UserSchema.methods.generateAuthToken = function () {
//     // user
//     const user = this;
//     // additionally making sure, the JWT ticket itself will expire at some point (in this case in 3 hours)
//     const token = jwt
//       .sign({ _id: user._id.toString() }, ourSuperSecretKey, { expiresIn: '3h' })
//       .toString();
  
//     return token;
//   };
  
//   // Find By token
// UserSchema.statics.findByToken = function (token) {
//     const User = this;
  
//     // Decode the cookie
//     try {
//       // if the token is valid then we get back whatever we
//       // signed the cookie with  -> { _id: user._id.toString() }
//       let decoded = jwt.verify(token, ourSuperSecretKey);
//       console.log(`decoded`, decoded);
//       return User.findOne({ _id: decoded._id });
//     } catch (error) {
//       return;
//     }
//   };

UserSchema.pre('save', function () {
    const user = this;
    // convert plain password to password hash (but ONLY if password was modified)
    if (user.isModified('password')) {
      user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds
    }
  });


const User = model("User", UserSchema);

module.exports = User;

