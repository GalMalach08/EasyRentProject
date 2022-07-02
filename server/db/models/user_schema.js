const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // remove the white space from the begining and the end
    lowercase: true,
    validate(value) {
      if (!validator.isEmail) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.facebookId;
    },
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: function () {
      return !this.googleId && !this.facebookId;
    },
    trim: true,
  },
  firstname: {
    type: String,
    trim: true,
    maxLength: 100,
  },
  lastname: {
    type: String,
    trim: true,
    maxLength: 100,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  isJustChangedPassword: {
    type: Boolean,
  },
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPrefrences",
  },
  isAdmin: {
    type: Boolean,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  if (user.isModified("confirmPassword")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.confirmPassword, salt);
    user.confirmPassword = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  const match = await bcrypt.compare(password, user.password); // bcrypt knows how to compare password to the hash password that saved in the database
  return match;
};

userSchema.statics.emailTaken = async function (email) {
  const user = await this.findOne({ email: email });
  return !!user;
};

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const userObj = {
    sub: user._id.toHexString(),
    email: user.email,
  };
  console.log(userObj);
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "1d" });
  return token;
};

userSchema.methods.generateRegisterToken = function () {
  const user = this;
  const userObj = {
    sub: user._id.toHexString(),
  };
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "10h" });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
