const mongoose = require("mongoose");

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