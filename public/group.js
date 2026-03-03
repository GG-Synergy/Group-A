document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.querySelector('input[name="name"]').value.trim();
        const roll = document.querySelector('input[name="roll"]').value.trim();
        const day = document.querySelector('select[name="day"]').value;
        const month = document.querySelector('select[name="month"]').value;
        const year = document.querySelector('select[name="year"]').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const course = document.querySelector('select[name="course"]').value;
        const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked'))
            .map(cb => cb.value);
        const address = document.querySelector('textarea[name="address"]').value.trim();

        // Validation
        if (!name || !roll || !gender || day === "-1" || month === "-1" || year === "-1" || !address) {
            alert("Please fill all required fields");
            return;
        }

        const data = { name, roll, day, month, year, gender: gender.value, course, hobbies, address };

        try {
            const res = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

         if (res.ok) {
    // Registration successful
    // redirect the browser manually
             window.location.href = "/success.html";
             form.reset(); // optional
         } else {
             const text = await res.text();
             alert("Registration failed:\n" + text);
}
        } catch (err) {
            alert("Server error");
            console.error(err);
        }
    });
});