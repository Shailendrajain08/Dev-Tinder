const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require ("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Image URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
      minLength: 20,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "Dev@Tinder&123", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (userPasswordInput) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordVal = await bcrypt.compare(userPasswordInput, passwordHash);
  return isPasswordVal;
};

module.exports = mongoose.model("User", userSchema);
