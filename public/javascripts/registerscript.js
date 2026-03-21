const pwinput=document.querySelector("#password");
const pwstrength=document.getElementById("pwstrength");

pwinput.addEventListener("input", updatePasswordStrength);

function updatePasswordStrength(e){
    pwstrength.textContent=e.target.value;
}

