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

function testFormValidate(){
   var pwlength=pwinput.value.length; 
   if (pwlength<=10){
       alert("Password must be more than 10 characters in length");
       return false;
   }
   if (pwinput.value.includes(" ")){
       alert("Spaces are not allowed in your password");
       return false;
   }
}

