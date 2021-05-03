const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const ourSuperSecretKey = env.jwt_key;
const env = require('../config/config');


const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, default: '/statics/avatar.png' },
    skills: [
      {
         _id:false,
         skillID:{
           type: Schema.Types.ObjectId, 
           ref: 'Skill'
         },
         boons: Number,
       }
    ],
    rating:{type:Number, default:0}
},
{
    versionKey: false,
    timestamps: true,
});


const UserResultSchema = new Schema({
  avgRating:Number
})

UserSchema.pre('save', function () {
    const user = this;
    // convert plain password to password hash (but ONLY if password was modified)
    if (user.isModified('password')) {
      user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds
    }
  });

const User = model("User", UserSchema);

module.exports = User;

