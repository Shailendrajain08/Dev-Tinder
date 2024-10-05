const express = require("express");
const connectDB = require ("./config/database")

const app = express();

connectDB()
.then(() => {
  console.log("Database connect established...");
  app.listen(3000, () => {
    console.log("Server Started Successfully on", " http://localhost:3000/");
  }); 
}).catch((err)=> {
  console.log("Database cannot be connectd!!...", err);
})


