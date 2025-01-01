const express = require("express");
const {userAuth} = require("../middlewares/auth")

const router = express.Router();

router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Somthing went wrong");
  }
});

module.exports = router;
