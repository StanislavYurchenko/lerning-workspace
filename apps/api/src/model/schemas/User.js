const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;
const { SALT_FACTOR } = require('../../constants/constants');

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is require'],
      unique: true,
      validate(value) {
        const isValidEmail = /\S+@\S+\.\S+/.test(String(value));
        return isValidEmail;
      },
    },
    password: {
      type: String,
      required: [true, 'Password is require'],
    },
    name: {
      type: String,
      required: [true, 'Name is require'],
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      require: [true, 'Verify token is require'],
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_FACTOR);
  next();
});

usersSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', usersSchema);

module.exports = User;
