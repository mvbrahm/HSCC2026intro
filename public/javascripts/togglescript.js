document.addEventListener("DOMContentLoaded", () => {
  const contrastButton = document.querySelector("#contrast-toggle");
  const container = document.querySelector(".container");
  const containerfl = document.querySelector(".container-fluid");
  const bd = document.querySelector("body");

  contrastButton.addEventListener("click", () => {
    container.classList.toggle("high-contrast");
    containerfl.classList.toggle("high-contrast");
    bd.classList.toggle("high-contrast");
  });
});