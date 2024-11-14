const express = require("express");
const connectDB = require("./config/database");
const app = express();
const userModel = require("./models/user");
const {ValidateSignUpData} = require('./utils/validation')
const bcrypt = require('bcrypt')

app.use(express.json());

// signup for the user
app.post("/signup", async (req, res) => {
  try {
  // Validation of data
    ValidateSignUpData(req)

    const {firstName, lastName, emailId, password } = req.body

  // Encrypt the password
   const passwordHash = await bcrypt.hash(password, 10);
   console.log(passwordHash)

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
      password : passwordHash
    });
    await user.save();
    res.status(200).send("user added successfully")
  } catch (err) {
    res.send(404, err.message)
  }
});

// find user by email
app.get("/user", async (req, res) => {
  try {
    const email = req.body.emailId;
    const user = await userModel.find({ emailId: email });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Getting all user data
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send(users)
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findByIdAndDelete({ _id: userId });

    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// update data from database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender", "photoUrl", "about", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }

    // Check for duplicate values in the 'skills' array
    if (data?.skills) {
      if (Array.isArray(data.skills)) {
        const uniqueSkills = [...new Set(data.skills)];
        if (uniqueSkills.length !== data.skills.length) {
          throw new Error("Duplicate skills are not allowed.");
        }
      }
      if (data?.skills.length > 20) {
        throw new Error("Skills can not be more than 20");
      }
    }

    const user = await userModel.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILD: " + err.message);
  }
});

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
