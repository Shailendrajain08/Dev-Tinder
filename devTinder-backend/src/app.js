const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth")
// Handle Auth Middleware for all GET POST, ... requests

app.use("/admin", adminAuth);

app.get ("/user", userAuth, (req, res) => {
  res.send("User data")
})

app.get("/admin/getAllData", (req,res) => {
  res.send("All Data send");
});

app.get("/admin/deleteUser", (req,res) => {
  res.send("Deleted a user")
})

app.listen(3000, () => {
  console.log("Server Started Successfully on", " http://localhost:3000/");
});
