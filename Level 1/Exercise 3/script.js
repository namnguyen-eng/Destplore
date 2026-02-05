const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const countEl = document.querySelector("#count");

const STORAGE_KEY = "namnguyen_todos_v1";

let tasks = loadTasks(); // [{ id, text }]

// ---------- Events ----------
addBtn.addEventListener("click", () => {
  addTaskFromInput();
});

// Bonus: add task using Enter key
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTaskFromInput();
});

// Delete using event delegation (works for dynamically added buttons)
taskList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action='delete']");
  if (!btn) return;

  const id = btn.getAttribute("data-id");
  deleteTask(id);
});

// ---------- Functions ----------
function addTaskFromInput() {
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = { id: crypto.randomUUID(), text };
  tasks.unshift(newTask); // newest on top

  saveTasks(tasks);
  render(tasks);

  taskInput.value = "";
  taskInput.focus();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks(tasks);
  render(tasks);
}

function render(list) {
  // Clear existing DOM
  taskList.innerHTML = "";

  // Empty state + counter
  countEl.textContent = String(list.length);
  emptyState.style.display = list.length === 0 ? "block" : "none";

  // Build DOM
  for (const task of list) {
    const li = document.createElement("li");
    li.className = "item";

    const p = document.createElement("p");
    p.className = "task-text";
    p.textContent = task.text;

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.type = "button";
    del.textContent = "Delete";
    del.setAttribute("data-action", "delete");
    del.setAttribute("data-id", task.id);

    li.appendChild(p);
    li.appendChild(del);
    taskList.appendChild(li);
  }
}

// ---------- localStorage ----------
function saveTasks(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Initial render
render(tasks);
