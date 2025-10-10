document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".games");
  const dropdown = document.querySelector(".games-dropdown-menu");
  const arrow = document.querySelector(".arrow-svg-size");

  if (!button || !dropdown) return;

  // Al hacer click en el botón
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const isOpen = dropdown.classList.contains("show");

    if (isOpen) {
      // Cierra el dropdown
      dropdown.classList.remove("show");
      arrow.classList.remove("arrow-rotated");
    } else {
      // Abre el dropdown
      dropdown.classList.add("show");
      arrow.classList.add("arrow-rotated");
    }
  });

  // Cierra al hacer click fuera del menú
  document.addEventListener("click", (e) => {
    const clickedInsideDropdown = dropdown.contains(e.target);
    const clickedButton = button.contains(e.target);

    if (!clickedInsideDropdown && !clickedButton) {
      dropdown.classList.remove("show");
      arrow.classList.remove("arrow-rotated");
    }
  });

  
});
