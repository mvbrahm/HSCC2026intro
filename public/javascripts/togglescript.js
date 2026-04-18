document.addEventListener("DOMContentLoaded", () => {
  const contrastButton = document.querySelector("#contrast-toggle");
  const container = document.querySelector(".container");

  contrastButton.addEventListener("click", () => {
    container.classList.toggle("high-contrast");
  });
});