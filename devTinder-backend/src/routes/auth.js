const express = require("express");
const router = express.Router();
const {ValidateSignUpData} = require('../utils/validation')
const userModel = require("../models/user")
const bcrypt = require('bcrypt');

// signup for the user
router.post("/signup", async (req, res) => {
  try {
    // Validation of data
    ValidateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating new instance of the user model

    // const data = req.body

    // if (data?.skills) {
    //   if (Array.isArray(data.skills)) {
    //     const uniqueSkills = [...new Set(data.skills)];
    //     if (uniqueSkills.length !== data.skills.length) {
    //       throw new Error("Duplicate skills are not allowed.");
    //     }
    //   }

    //   if (data?.skills.length > 20) {
    //     throw new Error("Skills can not be more than 20");
    //   }
    // }

    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.status(200).send("user added successfully");
  } catch (err) {
    res.send(404, err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await userModel.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send("Login Successfull");
    } else {
      res.status(404).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
