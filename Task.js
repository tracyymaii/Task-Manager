const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "must provide a task name"],  //optional
        maxLength: [50, "name cannot be more than 50 characters"] //optional
    },
    completed:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("tasks", TaskSchema);