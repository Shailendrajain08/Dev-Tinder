const express = require("express");
const connectDB = require("./config/database");
const app = express();
const userModel = require("./models/user");

app.use(express.json())

// signup for the user
app.post("/signup", async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// find user by email 
app.get("/user", async (req, res) => {
  try {
    const email = req.body.emailId;
    const user = await userModel.find({emailId : email})
    if(user.length === 0) {
      res.status(404).send("User not found")
    }else{
      res.status(200).send(user)
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});
 
// Getting all user data
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({})
    res.send(users)
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findByIdAndDelete({_id:userId})

    res.status(200).send("User deleted successfully")
  }
  catch(err) {
    res.status(400).send(err.message);
  }
})

// update data from database
app.patch("/user", async (req, res)=> {
  const userId = req.body._id
  const data = req.body;
  console.log(userId)
  try{
    await userModel.findByIdAndUpdate({_id:userId}, data)
    res.status(200).send("User updated successfully")
  }
  catch(err) {
    res.status(400).send(err.message);
  }
})

connectDB()
  .then(() => {
    console.log("Database connect established...");
    app.listen(3000, () => {
      console.log("Server Started Successfully on", " http://localhost:3000/");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connectd!!...", err);
  });
