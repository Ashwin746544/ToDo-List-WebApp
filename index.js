const Tasks_container = document.querySelector(".Tasks-container");
const addBtn = document.querySelector(".addBtn");
const saveBtn = document.querySelector(".saveBtn");
const titleInput = document.querySelector("#title");
const discriptionInput = document.querySelector("#disc");
let CheckboxArray = [];
let tasksArray = JSON.parse(localStorage.getItem("userTasks"));
if (tasksArray == null) {
  tasksArray = [];
  localStorage.setItem("userTasks", JSON.stringify(tasksArray));
}
// if (tasksArray.length == 0) {
//   document.querySelector('.no-task').classList.toggle("enableNoTasks");
// } else {
let taskshtml = "";
tasksArray.forEach((value, index, array) => {
  taskshtml += `<div class="task" id="task-${value.taskId}">
    <div class="check-container">
      <input type="checkbox" name="isChecked" id="checkItem-${value.taskId}" onclick="onTaskSelect(this)">
    </div>
    <div class="content">
      <h2 class="content-title" id="title-${value.taskId}">${value.title}</h2>
      <p class="content-discription" id="disc-${value.taskId}">
      ${value.discription}
      </p>
    </div>
    <div class="actions">
      <button class="edit" id="edit-${value.taskId}" onclick="editTask(this.id)"><img src="./assets/icons8-edit.svg" alt="Edit"></button>
      <button class="delete" id="delete-${value.taskId}" onclick="deleteTask(this.id)"><img src="./assets/icons8-delete.svg" alt="Delete"></button>
    </div>
  </div>`;
});
Tasks_container.innerHTML = taskshtml;
// }

function enableDefaultTask() {
  document.querySelector('.no-task').styel.display = "block";
}
addBtn.addEventListener("click", addTask);
function addTask() {
  const title = titleInput.value;
  const discription = discriptionInput.value;
  if (title == "" || discription == "") {
    return;
  }
  document.forms["myForm"].reset();
  const taskId = new Date().getTime();
  console.log(title + discription);
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
  console.log(task);
  const FirstChild = Tasks_container.firstChild;
  console.log("this is first child", FirstChild);
  Tasks_container.insertBefore(task, FirstChild);
}

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
    console.log("delete");
    const id = btnId.substring(7);
    console.log(id);
    const taskToDelete = document.querySelector("#task-" + id);
    console.log(taskToDelete);
    taskToDelete.remove();
    const indexToDelete = tasksArray.findIndex((value, index, array) => {
      return value.taskId == id;
    });
    tasksArray.splice(indexToDelete, 1);
    localStorage.setItem("userTasks", JSON.stringify(tasksArray));
    CheckboxArray = [];
  }
}
function editTask(editId) {
  const allEditBtns = document.querySelectorAll(".edit");
  Array.from(allEditBtns).forEach((element) => { element.style.cursor = "not-allowed"; element.style.pointerEvents = "none"; });
  console.log("edit");
  const id = editId.substring(5);
  console.log(id);
  const editTitle = document.querySelector("#title-" + id).innerText;
  const editDisc = document.querySelector("#disc-" + id).innerText;
  console.log(editTitle);
  console.log(editDisc);
  titleInput.value = editTitle;
  discriptionInput.value = editDisc;
  const content = document.querySelector(`#${editId}`).parentNode.previousElementSibling;
  console.log(content);
  content.classList.toggle("addBackground");
  addBtn.style.display = "none";
  saveBtn.style.display = "block";
  const f = () => saveTask(id);
  saveBtn.addEventListener("click", f);
  function saveTask(id) {
    console.log("saveid" + id);
    const title = titleInput.value;
    const discription = discriptionInput.value;
    if (title == "" || discription == "") {
      document.forms["myForm"].reset();
      content.classList.toggle("addBackground");
      addBtn.style.display = "block";
      saveBtn.style.display = "none";
      return;
    }
    document.querySelector("#title-" + id).innerHTML = title;
    document.querySelector("#disc-" + id).innerHTML = discription;
    document.forms["myForm"].reset();
    addBtn.style.display = "block";
    saveBtn.style.display = "none";
    tasksArray = tasksArray.map((value, index, array) => {
      return value.taskId == id ? { taskId: id, title: title, discription: discription } : value;
    }
    );
    localStorage.setItem("userTasks", JSON.stringify(tasksArray));
    saveBtn.removeEventListener("click", f);
    content.classList.remove("addBackground");
    Array.from(allEditBtns).forEach((element) => { element.style.cursor = "pointer"; element.style.pointerEvents = "auto"; });
  }
}

function onTaskSelect(checkbox) {
  if (checkbox.checked) {
    checkbox.parentNode.nextElementSibling.classList.toggle("addBackground");
    checkbox.parentNode.nextElementSibling.style.textDecoration = "line-through";
    CheckboxArray.push(checkbox.id);
    console.log(CheckboxArray);
  } else {
    checkbox.parentNode.nextElementSibling.classList.toggle("addBackground");
    checkbox.parentNode.nextElementSibling.style.textDecoration = "none";
    const index = CheckboxArray.indexOf(checkbox.id);
    CheckboxArray.splice(index, 1);
    console.log(CheckboxArray);
  }
};
