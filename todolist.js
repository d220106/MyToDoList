let taskList = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task === "") return;

  taskList.push({ text: task, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  taskList[index].done = !taskList[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement("li");


    li.innerHTML = `
    <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${index})" />
    <span class="task-text" style="text-decoration: ${task.done ? "line-through" : "none"}">${task.text}</span>
    <button class="delete-btn" onclick="deleteTask(${index})"> Del </button>
  `;
  
/*
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${index})" />
      <span style="text-decoration: ${task.done ? "line-through" : "none"}">${task.text}</span>
      <button onclick="deleteTask(${index})"> Delete </button>
    `;
*/


    list.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    taskList = JSON.parse(data);
  }
  renderTasks();
}

loadTasks();
