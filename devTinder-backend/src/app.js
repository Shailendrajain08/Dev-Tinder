const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser')

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth.js')
const profileRouter = require('./routes/profile.js')
const requestRouter = require('./routes/connectionReq.js')

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

connectDB()
  .then(() => {
    console.log("Database connect established...");
    app.listen(3000, () => {
      console.log("Server Started Successfully on", "http://localhost:3000/");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connectd!!...", err);
  });
