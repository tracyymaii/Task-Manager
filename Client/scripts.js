/**
 * Members: Tracy Mai, Minnie Cao, Kamile Vaicekonis
 * Assignment: List Manager 
 * File: script.js
 * Course: CSC 3221 - Netcentric Computing - Dr. Dennis Vickers 
 * 
 */

const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const newItem =  document.querySelector("#newitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");
const changeButton =  document.querySelector(".change-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);
changeButton.addEventListener("click", httpChange);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
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
  try{
    theList = await http.get("/api");
    ShowList();
  }catch(error){
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
    await http.post("/api", theList);
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
    theList.push(input.value);
    ShowList();
    await WriteList();
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
    const index = theList.indexOf(input.value);
    if (index !== -1) {
      theList.splice(index, 1);
      ShowList();
      await WriteList();
    }else{
      input.value = "unavailable item";
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
    const index = theList.indexOf(input.value);
    if (index !== -1) {
      theList.splice(index, 1, newItem.value);
      ShowList();
      await WriteList();
    }else{
      input.value = "unavailable item";
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
  addButton.disabled = true;
  delButton.disabled = true;
  changeButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
  changeButton.disabled = false;
}

main();