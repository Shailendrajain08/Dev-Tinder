const express = require("express");
const connectDB = require ("./config/database")
const app = express();
const userModel = require('./models/user')

app.post('/signup', async (req,res) => {
  const userObj = {
    firstName: "Shailendra",
    lastName: "Jain",
    emailId: "shailedra123@gmail.com",
    password: "Shailendra123@"
  }

  const user = new userModel(userObj)
  await user.save();
  res.send("user added successfully")
})

connectDB()
.then(() => {
  console.log("Database connect established...");
  app.listen(3000, () => {
    console.log("Server Started Successfully on", " http://localhost:3000/");
  }); 
}).catch((err)=> {
  console.log("Database cannot be connectd!!...", err);
})


