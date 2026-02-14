const form = document.querySelector("#form");

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const confirmError = document.querySelector("#confirmError");

const submitBtn = document.querySelector("#submitBtn");
const status = document.querySelector("#status");

const togglePwd = document.querySelector("#togglePwd");
const toggleConfirm = document.querySelector("#toggleConfirm");

// Simple email format check (good enough for client-side validation)
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  if (message) inputEl.classList.add("invalid");
  else inputEl.classList.remove("invalid");
}

function validateAll() {
  const e = email.value.trim();
  const p = password.value;
  const c = confirmPassword.value;

  // Email
  if (!e) setError(email, emailError, "Email is required.");
  else if (!isValidEmail(e)) setError(email, emailError, "Enter a valid email address.");
  else setError(email, emailError, "");

  // Password length
  if (!p) setError(password, passwordError, "Password is required.");
  else if (p.length < 6) setError(password, passwordError, "Password must be at least 6 characters.");
  else setError(password, passwordError, "");

  // Confirm password match
  if (!c) setError(confirmPassword, confirmError, "Please confirm your password.");
  else if (c !== p) setError(confirmPassword, confirmError, "Passwords do not match.");
  else setError(confirmPassword, confirmError, "");

  const isFormValid =
    !emailError.textContent && !passwordError.textContent && !confirmError.textContent;

  // Bonus: disable submit when invalid
  submitBtn.disabled = !isFormValid;

  return isFormValid;
}

// Validate on input (dynamic feedback)
[email, password, confirmPassword].forEach((el) => {
  el.addEventListener("input", () => {
    status.textContent = "";
    validateAll();
  });

  el.addEventListener("blur", () => {
    validateAll();
  });
});

// Bonus: show/hide password toggles
function toggleVisibility(inputEl, btnEl) {
  const isPassword = inputEl.type === "password";
  inputEl.type = isPassword ? "text" : "password";
  btnEl.textContent = isPassword ? "Hide" : "Show";
  btnEl.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
}

togglePwd.addEventListener("click", () => toggleVisibility(password, togglePwd));
toggleConfirm.addEventListener("click", () => toggleVisibility(confirmPassword, toggleConfirm));

// No page reload
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ok = validateAll();
  if (!ok) return;

  status.textContent = "✅ Form is valid! (Pretend account created.)";
  status.style.color = "var(--ok)";
});
