/**
 * Members: Tracy Mai, Minnie Cao, Kamile Vaicekonis
 * Assignment: List Manager 
 * File: script.js
 * Course: CSC 3221 - Netcentric Computing - Dr. Dennis Vickers 
 * 
 */

const http = new coreHTTP;

// Block Variables
let taskList = [];
let completion =[];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#newitem");
const taskitem =  document.querySelector("#taskitem");
const getButton =  document.querySelector(".get-btn");
const delButton =  document.querySelector(".del-btn");
const upButton =  document.querySelector(".up-btn");
const createButton =  document.querySelector(".create-btn");

// Listeners
getButton.addEventListener("click", GetList);
delButton.addEventListener("click", httpDelete);
createButton.addEventListener("click", httpPost);
upButton.addEventListener("click", httpChange);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (let i = 0; i < taskList.length; i++) {
    if (!completion[i]){
      output += `<li>${taskList[i]}</li>`;
    }else{
      output += `<li><s>${taskList[i]}</s></li>`;
    }
  }
  output += "</ul>";
  result.innerHTML = output;
}

/**
 * Get List
 * Uses async and await to attempt to show the list as long as no 
 * error occurs. Uses catch to print out an error message if there
 * was an error.
 */
async function GetList() {
  try {
    const tasks = await http.get("/tm/tasks");
    taskList = tasks.task.map(task => task.name);
    completion = tasks.task.map(task => task.completed);
    ShowList();
  } catch (error) {
    console.error('GetList() failed');
  }
}

/**
 * Write List
 * Uses async and await to attempt to post the list as long as no 
 * error occurs. Uses catch to print out an error message if there
 * was an error.
 */
async function WriteList() {
  try {
    const tasks = taskList.map((name, index) => ({ name, completed: completion[index] }));
    await http.post("/tm/tasks", tasks);
  } catch (error) {
    console.error('WriteList() failed');
  }
}

/**
 * http Post
 * Is triggered when a new item is added to the list from the website.
 * Pushes the new item onto the list and calls Showlist and awaits
 * for WriteList.
 * @param e
 */
/* Listener Functions */
async function httpPost(e) {
  try{
    if (input.value.trim() === ""){
      alert('Input field does not match coordinating buttons');
      return;
    }
    await http.post("/tm/tasks", {name: input.value, completed: false});
    GetList();
  }catch(error){
    console.error('httpPost() failed');
  }
}

/**
 * http Delete
 * Occurs when a request to delete an item from the list is triggered
 * from the website. Removes the item from the list and calls ShowList
 * and awaits for
 * @param e
 */
async function httpDelete(e) {
  try{
    const selected = document.querySelector('input[name="taskitem"]:checked');
    if (selected){
      completeList.push(selected.value);
      const index = taskList.indexOf(selected.value);
      taskList.splice(index, 1);
      ShowList();
      await WriteList();
    }else{
      console.log('no task selected');
    }
  }catch(error){
    console.error('httpDelete() failed');
  }
}

/**
 * http Change
 * Occurs when a request to change an existing item from the list is 
 * triggered from the website. Changes the old item to the newly 
 * requested one. If the old item does not exist, the change is unable
 * to happen. Catches and error that occurs and outputs an error 
 * message accordingly.
 * @param e
 */
async function httpChange(e) {
  try{

    const selected = document.querySelector('input[name="taskitem"]:checked');
    if (selected){
      const index = taskList.indexOf(selected.value);
      taskList.splice(index, 1, input.value);
      ShowList();
      await WriteList();
    }else{
      console.log('no task selected');
    }
  }catch(error){
    console.error('httpChange() failed');
  }
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  getButton.disabled = true;
  upButton.disabled = true;
  createButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  getButton.disabled = false;
  upButton.disabled = false;
  createButton.disabled = false;
  delButton.disabled = false;
}

main();