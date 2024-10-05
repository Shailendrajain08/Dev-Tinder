const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://shailendrajain0894:0123456789@cluster0.kl0hb.mongodb.net/devTinder"
    );
}

module.exports = connectDB;

