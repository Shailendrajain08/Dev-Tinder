const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({firstName: "Shailendra", lastName: "Jain"})
})

app.post("/user", (req, res) => {
  res.send("Data successfully saved to database")
})

app.delete("/user", (req, res) => {
  res.send("data deleted successfuly")
})


app.listen(3000, () => {
  console.log("Server Started Successfully on", " http://localhost:3000/");
});
