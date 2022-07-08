
const sidebar = document.querySelector(".sidebar");
const menuicon = document.querySelector(".menuicon");
const twosides = document.querySelector(".twosides");

menuicon.addEventListener("click", toggleSideMenu);
let isClosed = true;
function toggleSideMenu()
{
    if(isClosed)
    {
        sidebar.classList.add("show");
        twosides.classList.add("hide");
    }
    else
    {
        sidebar.classList.remove("show");
        twosides.classList.remove("hide");
    }
    isClosed = !isClosed;

};


//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button")

//onkeyup event
inputBox.onkeyup = () =>
{
    let userEnteredValue = inputBox.value; //getting user entered value
    if(userEnteredValue.trim() !=0) //if user values are not only spaces
    {
        addBtn.classList.add("active"); //activate the add button
    }
    else
    {
        addBtn.classList.remove("active"); //unactivate the add button   
    }
}

//if user clicks on the add icon button
addBtn.onclick = () =>
{
    let userEnteredValue = inputBox.value; //getting input field value
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorageData == null) //if localstorage has no data
    {
        listArray = []; //create a blank array
    }
    else
    {
        listArray = JSON.parse(getLocalStorageData) //transforming json string into a js object
    }
    listArray.push(userEnteredValue); //pushing or adding new value in Array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTasks function
    addBtn.classList.remove("active"); //deactivate the add button once the task is added
}

//function to add task list inside ul
function showTasks()
{
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorageData == null) //if localstorage is null
    {
        listArray = []; //creating blank array
    }
    else
    {
        listArray = JSON.parse(getLocalStorageData) //transforming json string into a js object
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
    if(listArray.length > 0) //if array length is greater than 0
    { 
      deleteAllBtn.classList.add("active"); //activate the delete button
    }else{
      deleteAllBtn.classList.remove("active"); //deactivate the delete button
    }
   let newLiTag = "";
   listArray.forEach((element, index) => 
   {
        newLiTag += `<li> ${element}<span onclick="deleteTask(${index})"> <i class="material-icons" > delete</i> </span> </li>`;
   });
   todoList.innerHTML = newLiTag; //adding new Li tag inside ul tag
   inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
  }
  
  // delete all tasks function
  deleteAllBtn.onclick = ()=>{
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorageData == null){ //if localstorage has no data
      listArray = []; //create a blank array
    }else{
      listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
      listArray = []; //create a blank array
    }
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //call the showTasks function
  }

