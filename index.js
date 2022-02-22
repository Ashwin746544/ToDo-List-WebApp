const Tasks_container = document.querySelector(".Tasks-container");
const addBtn = document.querySelector(".addBtn");
const saveBtn = document.querySelector(".saveBtn");
const titleInput = document.querySelector("#title");
const discriptionInput = document.querySelector("#disc");
let CheckboxArray = JSON.parse(localStorage.getItem("CheckboxArray")) || [];
let tasksArray = JSON.parse(localStorage.getItem("userTasks"));


if (tasksArray == null) {
  tasksArray = [];
  localStorage.setItem("userTasks", JSON.stringify(tasksArray));
}
if (tasksArray.length == 0) {
  document.querySelector('.no-task').style.display = "flex";
} else {
  let taskshtml = "";
  tasksArray.forEach((value, index, array) => {
    taskshtml += `<div class="task" id="task-${value.taskId}">
    <div class="check-container">
      <input type="checkbox" name="isChecked" id="checkItem-${value.taskId}" onclick="onTaskSelect(this)"  ${CheckboxArray.includes("checkItem-" + value.taskId) ? "checked" : ""}>
    </div >
      <div class="content ${CheckboxArray.includes("checkItem-" + value.taskId) ? "addBackground" : ""}">
      <h2 class="content-title" id="title-${value.taskId}">${value.title}</h2>
      <p class="content-discription" id="disc-${value.taskId}">
      ${value.discription}
      </p>
    </div >
      <div class="actions">
        <button class="edit" id="edit-${value.taskId}" onclick="editTask(this.id)"><img src="./assets/icons8-edit.svg" alt="Edit"></button>
        <button class="delete" id="delete-${value.taskId}" onclick="deleteTask(this.id)"><img src="./assets/icons8-delete.svg" alt="Delete"></button>
      </div>
  </div > `;
  });
  document.querySelector('.no-task').style.display = "none";
  Tasks_container.innerHTML = taskshtml;

}
// Create Task
addBtn.addEventListener("click", addTask);
function addTask() {
  addBtn.classList.add("btnAnimate");
  setTimeout(() => {
    addBtn.classList.remove("btnAnimate");
  }, 100);
  console.log('onclick fired');
  const title = titleInput.value.trim();
  const discription = discriptionInput.value.trim();
  if (title == "" || discription == "") {
    return;
  }
  // document.forms["myForm"].reset();
  const taskId = new Date().getTime();
  let newTask = { title: title, discription: discription, taskId: taskId };
  tasksArray.unshift(newTask);
  localStorage.setItem("userTasks", JSON.stringify(tasksArray));
  let task = document.createElement("div");
  task.className = "task";
  task.id = 'task-' + taskId;
  task.innerHTML = `<div class="check-container">
    <input type="checkbox" name="isChecked" id="checkItem-${taskId}" onclick="onTaskSelect(this)">
  </div>
  <div class="content">
    <h2 class="content-title" id="title-${taskId}">${title}</h2>
    <p class="content-discription" id="disc-${taskId}">${discription}</p>
  </div>
  <div class="actions">
  <button class="edit" id="edit-${taskId}" onclick="editTask(this.id)"><img src="./assets/icons8-edit.svg" alt="Edit"></button>
  <button class="delete" id="delete-${taskId}" onclick="deleteTask(this.id)"><img src="./assets/icons8-delete.svg" alt="Delete"></button>
</div>`;
  const FirstChild = Tasks_container.firstChild;
  Tasks_container.insertBefore(task, FirstChild);
  if (tasksArray.length == 1) {
    document.querySelector('.no-task').style.display = "none";
  }
  return false;
}

//Delete Task
function deleteTask(btnId) {
  if (CheckboxArray.length >= 2) {
    CheckboxArray.forEach((checkboxId) => {
      const id = checkboxId.substring(10);
      document.querySelector("#task-" + id).remove();
      const indexToDelete = tasksArray.findIndex((value, index, array) => {
        return value.taskId == id;
      });
      tasksArray.splice(indexToDelete, 1);
    });
    CheckboxArray = [];
    localStorage.setItem("userTasks", JSON.stringify(tasksArray));
  } else {
    const id = btnId.substring(7);
    const taskToDelete = document.querySelector("#task-" + id);
    taskToDelete.remove();
    const indexToDelete = tasksArray.findIndex((value, index, array) => {
      return value.taskId == id;
    });
    tasksArray.splice(indexToDelete, 1);
    localStorage.setItem("userTasks", JSON.stringify(tasksArray));
    CheckboxArray = [];
  }
  if (tasksArray.length == 0) {
    document.querySelector('.no-task').style.display = "flex";
  } else {
    document.querySelector('.no-task').style.display = "none";
  }
}

// Edit Task
function editTask(editId) {
  const allEditBtns = document.querySelectorAll(".edit");
  Array.from(allEditBtns).forEach((element) => { element.style.cursor = "not-allowed"; element.style.pointerEvents = "none"; });
  const id = editId.substring(5);

  const editTitle = document.querySelector("#title-" + id).innerText;
  const editDisc = document.querySelector("#disc-" + id).innerText;

  titleInput.value = editTitle;
  discriptionInput.value = editDisc;
  const content = document.querySelector(`#${editId} `).parentNode.previousElementSibling;

  content.classList.toggle("addBackground");
  // addBtn.style.display = "none";
  // saveBtn.style.display = "block";
  addBtn.value = "Save Task";
  addBtn.style.backgroundColor = "green";
  const f = () => saveTask(id);
  // saveBtn.addEventListener("click", f);
  addBtn.removeEventListener("click", addTask);
  addBtn.addEventListener("click", f);

  // save Task
  function saveTask(id) {
    const title = titleInput.value;
    const discription = discriptionInput.value;
    if (title == "" || discription == "") {
      // document.forms["myForm"].reset();
      content.classList.toggle("addBackground");
      // addBtn.style.display = "block";
      // saveBtn.style.display = "none";
      addBtn.value = "Add Task";
      addBtn.style.backgroundColor = "purple";
      addBtn.addEventListener("click", addTask);
      Array.from(allEditBtns).forEach((element) => { element.style.cursor = "pointer"; element.style.pointerEvents = "auto"; });
      return;
    }
    document.querySelector("#title-" + id).innerHTML = title;
    document.querySelector("#disc-" + id).innerHTML = discription;
    // document.forms["myForm"].reset();
    // addBtn.style.display = "block";
    // saveBtn.style.display = "none";  
    addBtn.value = "Add Task";
    addBtn.style.backgroundColor = "purple";
    tasksArray = tasksArray.map((value, index, array) => {
      return value.taskId == id ? { taskId: id, title: title, discription: discription } : value;
    }
    );
    localStorage.setItem("userTasks", JSON.stringify(tasksArray));
    // saveBtn.removeEventListener("click", f);
    addBtn.removeEventListener("click", f);
    addBtn.addEventListener("click", addTask);
    content.classList.remove("addBackground");
    Array.from(allEditBtns).forEach((element) => { element.style.cursor = "pointer"; element.style.pointerEvents = "auto"; });
  }
}

function onTaskSelect(checkbox) {
  if (checkbox.checked) {
    checkbox.parentNode.nextElementSibling.classList.toggle("addBackground");
    checkbox.parentNode.nextElementSibling.style.textDecoration = "line-through";
    CheckboxArray.push(checkbox.id);

  } else {
    checkbox.parentNode.nextElementSibling.classList.toggle("addBackground");
    checkbox.parentNode.nextElementSibling.style.textDecoration = "none";
    const index = CheckboxArray.indexOf(checkbox.id);
    CheckboxArray.splice(index, 1);

  }
}

window.onbeforeunload = () => {
  localStorage.setItem("CheckboxArray", JSON.stringify(CheckboxArray));
  console.log("onunload");
}
