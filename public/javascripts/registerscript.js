const pwinput=document.querySelector("#password");
const pwstrength=document.getElementById("pwstrength");

pwinput.addEventListener("input", updatePasswordStrength);

function updatePasswordStrength(e){
    var pwlength=e.target.value.length; 
    if (pwlength<=10){
        pwstrength.textContent="Weak";
        pwstrength.style.color="red";
    }
    else if (pwlength>17){
        pwstrength.textContent="Strong";
        pwstrength.style.color="green";
    }
    else {
        pwstrength.textContent="Moderate";
        pwstrength.style.color="yellow";
    }
}

