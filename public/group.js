function showSuccess(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const roll = document.querySelector('input[name="roll"]').value.trim();
    // FIX: select names changed from "dob/Birthday_Month/Birthday_Year" to "day/month/year"
    const day   = document.querySelector('select[name="day"]').value;
    const month = document.querySelector('select[name="month"]').value;
    const year  = document.querySelector('select[name="year"]').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    // FIX: course select now has id="course", use that instead of generic 'select'
    const course = document.querySelector('select[name="course"]').value;
    const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked'))
        .map(cb => cb.value);  // FIX: use cb.value directly (reliable) instead of nextSibling.textContent
    const address = document.querySelector('textarea[name="address"]').value.trim(); // FIX: target by name

    if (!name)   { showPopup('Please enter your name'); return; }
    if (!roll)   { showPopup('Please enter your roll number'); return; }
    if (!gender) { showPopup('Please select your gender'); return; }
    if (day === '-1' || month === '-1' || year === '-1') {
        showPopup('Please select your full date of birth'); return; // FIX: added DOB validation
    }
    if (hobbies.length === 0) { showPopup('Please select at least one hobby'); return; }
    if (!address) { showPopup('Please enter your address'); return; }

    const message = `Registration Successful!\n\nName: ${name}\nRoll No: ${roll}\nDate of Birth: ${day}/${month}/${year}\nGender: ${gender.value}\nCourse: ${course}\nHobbies: ${hobbies.join(', ')}\nAddress: ${address}`;

    showPopup(message);
    document.querySelector('form').reset();
}

function showPopup(message) {
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// FIX: removed dead registerForm password check (form has no password field)
// loginForm listener kept but is a no-op - safe to leave
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // client-side login validation can go here
        });
    }
});