const mongoose = require("mongoose");

const connectionString = "mongodb+srv://Team6:1234@cluster0.glhvt.mongodb.net/TM-T6?retryWrites=true&w=majority";

// "mongodb+srv://Team6:1234@cluster0.glhvt.mongodb.net/"
//mongodb+srv://Team6:1234@cluster0.glhvt.mongodb.net/TM-T6?retryWrites=true&w=majority //&appName=Cluster0

const connectDB = () => {
    return mongoose.connect(connectionString);
};

module.exports = connectDB;