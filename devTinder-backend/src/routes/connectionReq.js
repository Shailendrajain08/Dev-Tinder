const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userModel = require("../models/user");

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid Status Type: " + status });
    }

    // check weather Id Present in db to send request

    const toUser = await userModel.findById(toUserId);

    if (!toUser) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }

    //if there is an existing Connection Request

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({ message: "Connection Request Already Exists! " });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    if (status === "interested") {
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    }
    if (status === "ignored") {
      res.json({
        message: req.user.firstName + " " + status + " " + toUser.firstName,
        data,
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Sending Request.", error: err.message });
  }
});

module.exports = router;
