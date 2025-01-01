const express = require('express')
const router = express.Router();
const {userAuth} = require("../middlewares/auth")

router.post("/sendingConnection", userAuth, async (req, res) => {
    const user = req.user
    console.log(`${user.firstName} is sending connection req`)
    res.send(`connection request sent by ${user.firstName}`)
  })

module.exports = router;