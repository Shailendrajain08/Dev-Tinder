const express = require("express");
const {userAuth} = require("../middlewares/auth")
const {validateMyProfileEditData} = require("../utils/validation")
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require('bcrypt');

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(userModel).send("Somthing went wrong");
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try{
    if(!validateMyProfileEditData(req)){
      return res.status(400).send("ERROR : Invalid Edit Request" )
    }
    const loggedInUser = req.user
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key] ))

    await loggedInUser.save()
     res.json({
      message : `${loggedInUser.firstName} ${loggedInUser.lastName}, Your profile updated successfully`,
      data : loggedInUser
     })
  }
  catch(err) {
    res.status(400).send("ERROR : " + err.message)
  }
});

router.post("/profile/forgot-password", userAuth, async (req, res) => {
  try {
    const { emailId, currentPassword, newPassword } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if(!currentPassword) {
      return res.status(400).json({ message: "Please provide your current password" });
    }
    
    // Check if the current password is correct
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful." });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password.", error: err.message });
  }
});

module.exports = router;
