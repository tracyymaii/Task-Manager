/**
 * Members: Tracy Mai, Minnie Cao, Kamile Vaicekonis
 * Assignment: List Manager 
 * File: app.js
 * Course: CSC 3221 - Netcentric Computing - Dr. Dennis Vickers 
 */

// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// Define some built-in middleware
app.use(express.static("./Client"));
app.use(express.json());

// Define HTTP routes listenting for requests

/**
 * get
 * Uses try to sends a get request to read the data from the 
 * file manager. Catches any errors and outputs an error message
 * to the console.
 */
app.get("/api", async (req,res) => {
  try{
    res.send(await fm.ReadData());
  }catch(err){
    console.error(err);
  }
});


/**
 * post 
 * Uses try to send a request to be able to edit the list 
 * (write or delete) and outputs a confirmation message when it is 
 * able to do so. Catches any errors and ouputs an error message to 
 * the console.
 */
app.post("/api", async (req,res) => {
  try{
    await fm.WriteData(req.body);
    res.send();
  }catch(err){
    console.error(err);
  }
})

// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// Create a server
const appName = "Simple List";
const port = 5500;
app.listen(port, () => {
  console.log(`App ${appName} is running on http://localhost:${port}`);
})

