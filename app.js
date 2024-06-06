
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

//define simple route


//requesst for get will trigger find function on mongoose object
//  task is the last part of the url // funcction runs when express sees this particular get request
 app.get("/tm/tasks", async (req,res) => {
   try{             
    const task = await tasks.find();
    res.status(200).json({task});
   }catch{
      res.status(500).json({msg: error});
   };
 });



//connect to data base and start the node server
(async function () {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`${appName} is running on http://localhost:${port}`);
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

app.post("/tm/tasks", async (req,res) => {
  try{             
    const newTask = await tasks.create(req.body);
    res.status(201).json({ task: newTask });
  }catch{
      res.status(500).json({msg: error});
  };
 });


app.delete("/tm/tasks", async (req,res) => {
  try{
    const finishTask = await tasks.updateOne({name: req.body}, {completed: true});
    res.status(200).json({msg: "Good job completing a task!"});
  }catch{
    res.status(500).json({msg: error});
  };
});

app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});