/**
 * Team 3:
 * Tracy Mai
 * Minnie Cao
 * Kamile Vaicekonis
 * CSC3221 - Netcentric Computing
 * Task Manager Project
 * Connect.js
 */

const mongoose = require("mongoose");

const connectionString = "mongodb+srv://Team6:1234@cluster0.glhvt.mongodb.net/TM-T6?retryWrites=true&w=majority";

// "mongodb+srv://Team6:1234@cluster0.glhvt.mongodb.net/"
//mongodb+srv://Team6:1234@cluster0.glhvt.mongodb.net/TM-T6?retryWrites=true&w=majority //&appName=Cluster0

/**
 * ConnectDB funciton
 * This funciton uses the Mongoose connect method to connect the application to the database.
 * @returns the connection promise
 */
const connectDB = () => {
    return mongoose.connect(connectionString);
};

module.exports = connectDB;
