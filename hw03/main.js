const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#primary-menu");

toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", !isOpen);
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Open menu" : "Close menu"
    );

    menu.classList.toggle("open");
});