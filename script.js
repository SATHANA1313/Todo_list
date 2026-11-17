
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
