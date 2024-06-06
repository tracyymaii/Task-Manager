/**
 * Team 3:
 * Tracy Mai
 * Minnie Cao
 * Kamile Vaicekonis
 * CSC3221 - Netcentric Computing
 * Task Manager Project
 * App.js - Backend
 */

// Get the modules
const express = require("express");
const connectDB = require("./connect");
//const fm = require("./filemgr");

const appName = "Task Manager";
const port = 5500;
const app = express();

//middleware
// app.use(express.json());
app.use(express.static("./Client"));
app.use(express.json());

// Data model (Schema)
const tasks = require("./Task");

/**
 * Get function
 * This function uses the Express app object to define a simple route, specifying the route path to tasks.
 * In the try block, it listens for requests for the route by calling the Mongoose request "find" that returns a query.
 * If the request fails, the try block throws an exception and the catch block executes to display an error message.
 */
 app.get("/tm/tasks", async (req,res) => {
   try{             
    const task = await tasks.find();
    res.status(200).json({task});
   }catch{
      res.status(500).json({msg: error});
   };
 });

/**
 * This function connects to the database by using the connectDB server framework for Node and an app object listener.
 * In the try block, the function listens for users the specified address with the port. A message is displayed specifying the address and port.
 * This creates the server for the task manager.
 * If the request fails, the try block throws an exception and the catch block executes to display an error message to the console.
 */
(async function () {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`${appName} is running on http://localhost:${port}/tm/tasks`);
    })
  } catch (error) {
    console.log(error);
  };
}) ();

// app.post("/api", async (req,res) => {
//   try{
//     await fm.WriteData(req.body);
//     res.send();
//   }catch(err){
//     console.error(err);
//   }
// })

/**
 * Post function
 * This function uses the Express app object to route the HTTP post request.
 * To update modifications to the tasks, Mongoose create is defined to listen for changes to the database in the try block.
 * If the request fails, the try block throws an exception and the catch block executes to display an error message.
 */
app.post("/tm/tasks", async (req,res) => {
  try{          
    console.log(req.body);   
    const newTask = await tasks.create(req.body);
    res.status(201).json({ task: newTask });
  }catch{
      res.status(500).json({msg: error});
  };
 });

/**
 * Delete function
 * This function uses the Express app object to handle HTTP delete requests within the tasks path.
 * The Mongoose deleteOne operation deletes the first item in the document that matches the specified task name in the try block.
 * If it fails, the try block throws an exception and the catch block executes to display an error message.
 */
 app.delete("/tm/tasks", async (req,res) => {
  try {
    const finishTask = await tasks.deleteOne({name: req.query.taskname});
    res.status(200).json({finishTask});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

/**
 * Put function
 * This function uses the Express app object to route the HTTP put request.
 * The try block uses the Mongoose findOneAndUpdate operation that sends a query to find the task that matches the specified name
 * and updates the name to a new name.
 * It also sets new to true after the update was made.
 * Without setting new to true, the function would return the original document rather than the updated one.
 * If a task that matches the filter is not found, the message 'Task not found' is displayed.
 * If the request fails, the try block throws an exception and the catch block executes to display an error message.
 */
app.put('/tm/tasks', async (req, res) => {
  try {
    const updatedTask = await tasks.findOneAndUpdate(
      { name: req.query.oldName},
      { name: req.body.newName, completed: req.body.state },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * All funciton
 * This funciton displays a message if the page is not found.
 */
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});
