let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentUser = localStorage.getItem("currentUser") || null;

function login() {
  const username = document.getElementById("username").value.trim();
  if (username) {
    currentUser = username;
    localStorage.setItem("currentUser", username);
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("userDisplay").textContent = currentUser;
    renderTasks();
  }
}

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;
  const due = document.getElementById("taskDue").value;
  const assign = document.getElementById("taskAssign").value;
  const status = document.getElementById("taskStatus").value;

  if (title && assign && due) {
    tasks.push({
      id: Date.now(),
      title,
      desc,
      due,
      assign,
      status,
      createdBy: currentUser
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    document.querySelectorAll('.task-form input, .task-form select').forEach(el => el.value = '');
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => task.assign === currentUser || task.createdBy === currentUser);

  filteredTasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.desc}</p>
      <small>Assigned to: ${task.assign}</small><br/>
      <small>Status: ${task.status}</small><br/>
      <small>Due: ${task.due}</small>
    `;
    taskList.appendChild(taskDiv);
  });
}

if (currentUser) {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("userDisplay").textContent = currentUser;
  renderTasks();
}
