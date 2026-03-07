const API_URL = "https://jsonplaceholder.typicode.com/users";

const userList = document.querySelector("#userList");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const empty = document.querySelector("#empty");
const searchInput = document.querySelector("#searchInput");

let users = [];

async function fetchUsers() {
  showLoading();
  hideError();
  hideEmpty();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch users.");
    }

    const data = await response.json();
    users = data;
    renderUsers(users);
  } catch (err) {
    showError("Something went wrong while loading users. Please try again.");
    userList.innerHTML = "";
  } finally {
    hideLoading();
  }
}

function renderUsers(list) {
  userList.innerHTML = "";

  if (list.length === 0) {
    showEmpty();
    return;
  }

  hideEmpty();

  list.forEach((user) => {
    const card = document.createElement("article");
    card.className = "user-card";

    card.innerHTML = `
      <h3 class="user-name">${user.name}</h3>
      <p class="user-info"><strong>Email:</strong> ${user.email}</p>
      <p class="user-info"><strong>City:</strong> ${user.address.city}</p>
    `;

    userList.appendChild(card);
  });
}

function filterUsers() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(keyword)
  );

  renderUsers(filteredUsers);
}

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  error.textContent = message;
  error.classList.remove("hidden");
}

function hideError() {
  error.textContent = "";
  error.classList.add("hidden");
}

function showEmpty() {
  empty.classList.remove("hidden");
}

function hideEmpty() {
  empty.classList.add("hidden");
}

searchInput.addEventListener("input", filterUsers);

fetchUsers();
