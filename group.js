function showSuccess(event) {
    event.preventDefault();

    // Get form values
    const name = document.querySelector('input[name="name"]').value.trim();
    const roll = document.querySelector('input[name="roll"]').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const course = document.querySelector('select').value;
    const hobbies = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.nextSibling.textContent.trim());
    const address = document.querySelector('textarea').value.trim();

    // Validation
    if (!name) {
        showPopup('Please enter your name');
        return;
    }
    if (!roll) {
        showPopup('Please enter your roll number');
        return;
    }
    if (!gender) {
        showPopup('Please select your gender');
        return;
    }
    if (hobbies.length === 0) {
        showPopup('Please select at least one hobby');
        return;
    }
    if (!address) {
        showPopup('Please enter your address');
        return;
    }

    // Create success message
    const message = `
        Registration Successful!
        
        Name: ${name}
        Roll No: ${roll}
        Gender: ${gender.value || gender.nextSibling.textContent.trim()}
        Course: ${course}
        Hobbies: ${hobbies.join(', ')}
        Address: ${address}
    `;

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