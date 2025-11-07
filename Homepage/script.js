document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    // Toggle Nav
    navLinks.classList.toggle("active");

    // Hamburger Animation
    hamburger.classList.toggle("toggle");
  });

  // Close nav when a link is clicked
  document.querySelectorAll(".nav-links li a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("toggle");
    });
  });
});
