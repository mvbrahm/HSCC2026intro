document.addEventListener("DOMContentLoaded", () => {
  const emailupdateButton = document.querySelector("#emailupdate-toggle");
  const emailupdateform = document.querySelector("#emailupdate");

  emailupdateButton.addEventListener("click", () => {
    if (emailupdateform.style.display === "none") {
    emailupdateform.style.display = "block";
  } else {
    emailupdateform.style.display = "none";
  }
  });
});