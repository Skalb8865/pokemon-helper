const navbar = document.querySelector("header");
const navLinks = document.querySelector("nav-links");

window.addEventListener("scroll", () => {
  if (window.scrollY > 75) {
    navbar.style.background = "#ee1515"
  } else {
    navbar.style.background = "var(--clr-dark)"
  }
});