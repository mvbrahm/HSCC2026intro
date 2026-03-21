const pwinput = document.getElementById('password');
const pwstrength = document.getElementById('pwstrength');

pwinput.addEventListener('input', updatePasswordStrength);

function updatePasswordStrength(e) {
    var pwlength = e.target.value.length;
    if (pwlength < 10) {
        pwstrength.textContent = 'weak';
        pwstrength.style.color = 'red';
    } else if (pwlength > 17) {
        pwstrength.textContent = 'strong';
        pwstrength.style.color = 'green';
    } else {
        pwstrength.textContent = 'moderate';
        pwstrength.style.color = 'orange'; 
    }
    // pwstrength.textContent = `Password length: ${pwlength}`;
}

function testPasswordStrength() {
    var pwlength = pwinput.value.length;
    if (pwlength < 10) {
        alert('Password must be at least 10 characters long.');
        return false;
    }
    // check that there are no spaces in the password using contains method
    if (pwinput.value.includes(' ')) {
        alert('Password cannot contain spaces.');
        return false;
    }
    return true;
}