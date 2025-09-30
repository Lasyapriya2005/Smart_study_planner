// ✅ LocalStorage helpers
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// ✅ Tasks
function addTask(task) {
  if (!task) return;
  let tasks = loadData("tasks");
  tasks.push({ text: task, completed: false });
  saveData("tasks", tasks);
}

// Export tasks to JSON
function exportTasks() {
  const dataStr = JSON.stringify(tasks); // 'tasks' is your task array
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks_backup.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import tasks from JSON
function importTasks(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedTasks = JSON.parse(e.target.result);
      tasks = importedTasks;
      renderTasks(); // update UI
      alert("Tasks imported successfully!");
    } catch (err) {
      alert("Invalid JSON file!");
    }
  };
  reader.readAsText(file);
}
function setTask(day, hour, task) {
  const cellId = `${day}-${hour}`;
  const cell = document.getElementById(cellId);
  if (cell) {
    cell.innerText = task;
  }
}

// Example usage:
setTask("mon", "8", "Updated Math"); // changes Monday 08:00-09:00

// HTML buttons example
// <button onclick="exportTasks()">Export Tasks</button>
// <input type="file" accept=".json" onchange="importTasks(event)">

function toggleTask(index) {
  let tasks = loadData("tasks");
  tasks[index].completed = !tasks[index].completed;
  saveData("tasks", tasks);
  displayTasks();
}

function displayTasks() {
  let tasks = loadData("tasks");
  let taskList = document.getElementById("taskList");
  if (!taskList) return;
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    let li = document.createElement("li");
    li.innerHTML = `<input type='checkbox' ${
      t.completed ? "checked" : ""
    } onclick="toggleTask(${i})"> ${t.text}`;
    taskList.appendChild(li);
  });
}

// ✅ Calendar (store events)
function addEvent(date, event) {
  let events = loadData("events");
  events.push({ date, event });
  saveData("events", events);
  displayEvents();
}

function displayEvents() {
  let events = loadData("events");
  let list = document.getElementById("eventList");
  if (!list) return;
  list.innerHTML = "";
  events.forEach((e) => {
    let li = document.createElement("li");
    li.textContent = `${e.date}: ${e.event}`;
    list.appendChild(li);
  });
}

// ✅ Timetable
function saveTimetable(day, subject) {
  let table = loadData("timetable");
  table.push({ day, subject });
  saveData("timetable", table);
  displayTimetable();
}

function displayTimetable() {
  let table = loadData("timetable");
  let list = document.getElementById("timetableList");
  if (!list) return;
  list.innerHTML = "";
  table.forEach((t) => {
    let li = document.createElement("li");
    li.textContent = `${t.day}: ${t.subject}`;
    list.appendChild(li);
  });
}

// ✅ Reminders
function addReminder(reminder, time) {
  let reminders = loadData("reminders");
  reminders.push({ reminder, time });
  saveData("reminders", reminders);
  displayReminders();
}

function displayReminders() {
  let reminders = loadData("reminders");
  let list = document.getElementById("reminderList");
  if (!list) return;
  list.innerHTML = "";
  reminders.forEach((r) => {
    let li = document.createElement("li");
    li.textContent = `${r.reminder} at ${r.time}`;
    list.appendChild(li);
  });
}

// ✅ Notes
function addNote(note) {
  let notes = loadData("notes");
  notes.push(note);
  saveData("notes", notes);
  displayNotes();
}

function displayNotes() {
  let notes = loadData("notes");
  let list = document.getElementById("noteList");
  if (!list) return;
  list.innerHTML = "";
  notes.forEach((n) => {
    let li = document.createElement("li");
    li.textContent = n;
    list.appendChild(li);
  });
}

// ✅ Progress Tracking
function calculateProgress() {
  let tasks = loadData("tasks");
  if (tasks.length === 0) return 0;
  let completed = tasks.filter((t) => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
}

function displayProgress() {
  let progressBar = document.getElementById("progressBar");
  if (!progressBar) return;
  let progress = calculateProgress();
  progressBar.style.width = progress + "%";
  progressBar.textContent = progress + "%";
}

// ✅ Dark/Light Mode
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}

// ✅ Pomodoro Timer
let timer;
function startPomodoro() {
  let time = 25 * 60; // 25 minutes
  let display = document.getElementById("timer");
  clearInterval(timer);
  timer = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    time--;
    if (time < 0) clearInterval(timer);
  }, 1000);
}
