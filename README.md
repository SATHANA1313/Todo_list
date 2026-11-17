# Ex03 To-Do List using JavaScript
## Date:

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM
## index.html:
```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Todo Application</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <header>
        <div>
            <h1>My Todo List</h1>
            <p>Organize your day, one task at a time.</p>
        </div>
        <button id="themeBtn" onclick="toggleTheme()">🌙</button>
    </header>

    <section class="stats">
        <div class="stat-card">
            <h2 id="total">0</h2>
            <p>Total Tasks</p>
        </div>
        <div class="stat-card">
            <h2 id="completed">0</h2>
            <p>Completed</p>
        </div>
        <div class="stat-card">
            <h2 id="pending">0</h2>
            <p>Pending</p>
        </div>
    </section>

    <div class="progress-section">
        <p>Overall Progress</p>
        <div class="progress-bar">
            <div id="progress"></div>
        </div>
        <small id="progressText">0% completed</small>
    </div>

    <section class="task-form">
        <h2>Add New Task</h2>

        <input type="text" id="taskInput"
            placeholder="Enter your task...">

        <div class="form-row">
            <select id="category">
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
            </select>

            <select id="priority">
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
            </select>

            <input type="date" id="dueDate">
        </div>

        <button onclick="addTask()" id="addBtn">+ Add Task</button>
    </section>

    <section class="task-section">
        <h2>My Tasks</h2>

        <input type="text" id="searchInput"
            placeholder="🔍 Search tasks..."
            oninput="renderTasks()">

        <div class="filters">
            <button onclick="setFilter('all')">All</button>
            <button onclick="setFilter('pending')">Pending</button>
            <button onclick="setFilter('completed')">Completed</button>
        </div>

        <div class="filters">
            <select id="categoryFilter" onchange="renderTasks()">
                <option value="all">All Categories</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
            </select>

            <select id="sortFilter" onchange="renderTasks()">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
                <option value="date">Due Date</option>
            </select>
        </div>

        <div id="taskList"></div>

        <button class="clear-btn" onclick="clearCompleted()">
            Clear Completed Tasks
        </button>
    </section>
</div>

<script src="script.js"></script>
</body>
</html>

```
## style.css:
```

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f3f4f8;
    color: #222;
    padding: 30px 15px;
    transition: 0.3s;
}

.container {
    max-width: 850px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 25px #00000010;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

header h1 {
    color: #6842d9;
    margin-bottom: 8px;
}

header p {
    color: #777;
}

button {
    cursor: pointer;
    border: none;
    padding: 11px 17px;
    border-radius: 7px;
    background: #6842d9;
    color: white;
    font-size: 14px;
}

button:hover {
    opacity: 0.85;
}

#themeBtn {
    font-size: 20px;
}

.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.stat-card {
    background: #f1edff;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
}

.stat-card h2 {
    color: #6842d9;
    margin-bottom: 8px;
}

.progress-section {
    margin: 25px 0;
}

.progress-bar {
    height: 12px;
    background: #ddd;
    border-radius: 10px;
    margin: 10px 0;
    overflow: hidden;
}

#progress {
    width: 0;
    height: 100%;
    background: #6842d9;
    transition: 0.3s;
}

.task-form, .task-section {
    margin-top: 25px;
}

.task-form h2, .task-section h2 {
    margin-bottom: 15px;
}

input, select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 7px;
    margin-bottom: 12px;
    background: white;
    color: #222;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

#addBtn {
    width: 100%;
    margin-bottom: 10px;
}

.filters {
    display: flex;
    gap: 10px;
    margin: 12px 0;
}

.filters button {
    flex: 1;
}

.filters select {
    flex: 1;
}

.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 9px;
    margin-bottom: 10px;
    background: #fafafa;
}

.task-info {
    flex: 1;
    overflow-wrap: anywhere;
}

.task-info h3 {
    margin-bottom: 7px;
}

.task-info small {
    color: #777;
}

.task-item.done h3 {
    text-decoration: line-through;
    color: #999;
}

.actions {
    display: flex;
    gap: 6px;
}

.actions button {
    padding: 8px 10px;
}

.edit-btn {
    background: #e5a000;
}

.delete-btn {
    background: #e04444;
}

.priority {
    font-size: 12px;
    font-weight: bold;
}

.empty {
    text-align: center;
    padding: 25px;
    color: #888;
}

.clear-btn {
    background: #e04444;
    width: 100%;
    margin-top: 15px;
}

body.dark {
    background: #171722;
    color: white;
}

body.dark .container {
    background: #252536;
}

body.dark .stat-card {
    background: #35304f;
}

body.dark input,
body.dark select {
    background: #353546;
    color: white;
    border-color: #555;
}

body.dark .task-item {
    background: #303041;
    border-color: #444;
}

body.dark .progress-bar {
    background: #454555;
}

@media (max-width: 600px) {
    .container {
        padding: 18px;
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .stats {
        gap: 7px;
    }

    .stat-card {
        padding: 12px 5px;
    }

    .task-item {
        flex-wrap: wrap;
    }

    .actions {
        width: 100%;
    }
}

```
## script.js:
```

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let editId = null;

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add or update task
function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) {
        alert("Please enter a task!");
        return;
    }

    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("dueDate").value;

    if (editId !== null) {
        const task = tasks.find(t => t.id === editId);
        task.title = title;
        task.category = category;
        task.priority = priority;
        task.dueDate = dueDate;
        editId = null;
        document.getElementById("addBtn").textContent = "+ Add Task";
    } else {
        tasks.push({
            id: Date.now(),
            title,
            category,
            priority,
            dueDate,
            completed: false,
            createdAt: Date.now()
        });
    }

    input.value = "";
    document.getElementById("dueDate").value = "";

    saveTasks();
    renderTasks();
}

// Display tasks
function renderTasks() {
    const list = document.getElementById("taskList");
    const search = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const sort = document.getElementById("sortFilter").value;

    let filtered = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search);
        const matchesCategory = category === "all" || task.category === category;

        const matchesStatus =
            currentFilter === "all" ||
            (currentFilter === "completed" && task.completed) ||
            (currentFilter === "pending" && !task.completed);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    if (sort === "newest") {
        filtered.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === "oldest") {
        filtered.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "priority") {
        const order = { High: 3, Medium: 2, Low: 1 };
        filtered.sort((a, b) => order[b.priority] - order[a.priority]);
    } else if (sort === "date") {
        filtered.sort((a, b) =>
            (a.dueDate || "9999").localeCompare(b.dueDate || "9999")
        );
    }

    list.innerHTML = "";

    if (filtered.length === 0) {
        list.innerHTML = '<p class="empty">No tasks found. Add a new task!</p>';
    }

    filtered.forEach(task => {
        const item = document.createElement("div");
        item.className = `task-item ${task.completed ? "done" : ""}`;

        const info = document.createElement("div");
        info.className = "task-info";

        const heading = document.createElement("h3");
        heading.textContent = task.title;

        const details = document.createElement("small");
        details.textContent =
            `${task.category} | ${task.priority} Priority | Due: ${task.dueDate || "Not set"}`;

        const priority = document.createElement("p");
        priority.className = "priority";
        priority.style.color =
            task.priority === "High" ? "#e04444" :
            task.priority === "Medium" ? "#d18b00" : "#269b65";
        priority.textContent = task.completed ? "Completed" : "Pending";

        info.append(heading, details, priority);

        const actions = document.createElement("div");
        actions.className = "actions";

        const check = document.createElement("button");
        check.textContent = task.completed ? "Undo" : "✓";
        check.onclick = () => toggleTask(task.id);

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.className = "edit-btn";
        edit.onclick = () => editTask(task.id);

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "delete-btn";
        del.onclick = () => deleteTask(task.id);

        actions.append(check, edit, del);
        item.append(info, actions);
        list.appendChild(item);
    });

    updateStats();
}

// Complete or undo
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);

    if (task.completed) {
        alert("Undo completion before editing this task.");
        return;
    }

    document.getElementById("taskInput").value = task.title;
    document.getElementById("category").value = task.category;
    document.getElementById("priority").value = task.priority;
    document.getElementById("dueDate").value = task.dueDate;

    editId = id;
    document.getElementById("addBtn").textContent = "Update Task";

    document.getElementById("taskInput").focus();
}

// Delete task
function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(t => t.id !== id);
        if (editId === id) {
            editId = null;
            document.getElementById("addBtn").textContent = "+ Add Task";
        }
        saveTasks();
        renderTasks();
    }
}

// Clear completed
function clearCompleted() {
    if (confirm("Delete all completed tasks?")) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    }
}

// Filter tasks
function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percentage = total === 0 ? 0 :
        Math.round((completed / total) * 100);

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("pending").textContent = pending;
    document.getElementById("progress").style.width = percentage + "%";
    document.getElementById("progressText").textContent =
        percentage + "% completed";
}

// Dark mode
function toggleTheme() {
    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");
    document.getElementById("themeBtn").textContent =
        dark ? "☀️" : "🌙";

    localStorage.setItem("darkMode", dark);
}

// Load saved theme
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").textContent = "☀️";
}

// Initial display
renderTasks();

```
## OUTPUT
![alt text](<Screenshot (151).png>)

## RESULT
The program for creating To-do list using JavaScript is executed successfully.