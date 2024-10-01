const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server to dashboard");
});

app.get("/hello", (req, res) => {
  res.send("Hello from server to hello");
});

app.get("/test", (req, res) => {
  res.send("Hello from server to test");
});

app.listen(3000, () => {
  console.log("Server Started Successfully on", " http://localhost:3000/");
});
