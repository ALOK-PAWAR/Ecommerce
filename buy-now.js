function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;

    // Basic validation for empty fields
    if (name === '' || email === '' || phone === '' || address === '' || city === '' || state === '' || zip === '') {
        alert("Please fill in all fields.");
        return false;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Phone number validation (simple check)
    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.");
        return false;
    }

    return true; // If all validation passes, form submits
}
