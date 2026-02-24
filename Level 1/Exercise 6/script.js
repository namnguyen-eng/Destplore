// Skills: data-* attributes + active state management

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function setActive(tabName) {
  // Update tabs
  tabs.forEach((t) => {
    const isActive = t.dataset.tab === tabName;
    t.classList.toggle("active", isActive);
    t.setAttribute("aria-selected", String(isActive));
  });

  // Update panels
  panels.forEach((p) => {
    const isActive = p.dataset.panel === tabName;
    p.classList.toggle("active", isActive);
  });
}

// Click handling
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActive(tab.dataset.tab);
  });
});
