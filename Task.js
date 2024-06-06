/*
 * Team 3:
 * Tracy Mai
 * Minnie Cao
 * Kamile Vaicekonis
 * CSC3221 - Netcentric Computing
 * Task Manager Project
 * Task.js
 */

const mongoose = require("mongoose");

// This function creates a new task schema using Mongoose and defines the structure of the document.
const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
       
    },
    completed:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("tasks", TaskSchema);
