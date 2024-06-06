

const http = new coreHTTP;


let theList = [];


const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const newItem =  document.querySelector("#newitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");
const changeButton =  document.querySelector(".change-btn");


addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);
changeButton.addEventListener("click", httpChange);

function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}


async function GetList() {
  try{
    theList = await http.get("/api");
    ShowList();
  }catch(error){
    console.error('GetList() failed');
  }
}


async function WriteList() {
  try {
    await http.post("/api", theList);
  } catch (error) {
    console.error('WriteList() failed');
  }
}

async function httpPost(e) {
  try{
    theList.push(input.value);
    ShowList();
    await WriteList();
  }catch(error){
    console.error('httpPost() failed');
  }
}


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