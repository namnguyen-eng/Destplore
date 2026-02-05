const openBtn = document.querySelector("#openBtn");
const overlay = document.querySelector("#overlay");
const closeBtn = document.querySelector("#closeBtn");
const okBtn = document.querySelector("#okBtn");

// Helpers
function openModal() {
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");

  // Optional: prevent background scrolling
  document.body.style.overflow = "hidden";

  // Nice touch: focus the close button
  closeBtn.focus();
}

function closeModal() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  // Return focus to the Open button
  openBtn.focus();
}

// Open
openBtn.addEventListener("click", openModal);

// Close by clicking close button or OK
closeBtn.addEventListener("click", closeModal);
okBtn.addEventListener("click", closeModal);

// Close by clicking overlay (but NOT when clicking inside modal)
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// Bonus: Close with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) {
    closeModal();
  }
});
