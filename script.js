document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");
    li.onclick = () => toggleComplete(index);

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}
