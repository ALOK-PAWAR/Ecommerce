// Performed by ALOK PAWAR
document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let isValid = true;

    // Clear previous error messages
    emailError.textContent = '';
    passwordError.textContent = '';
    emailInput.style.borderColor = '#ccc';
    passwordInput.style.borderColor = '#ccc';

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.style.borderColor = 'red';
        isValid = false;
    }

    // Password validation (at least 6 characters for this example)
    if (passwordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordInput.style.borderColor = 'red';
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        // Perform sign-in action here
    }
});
