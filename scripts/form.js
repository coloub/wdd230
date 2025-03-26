document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');
    const pageRating = document.getElementById('page-rating');
    const ratingValue = document.getElementById('rating-value');

    // Password confirmation validation
    confirmPassword.addEventListener('input', () => {
        if (password.value !== confirmPassword.value) {
            passwordError.textContent = 'Passwords do not match';
            confirmPassword.setCustomValidity('Passwords do not match');
        } else {
            passwordError.textContent = '';
            confirmPassword.setCustomValidity('');
        }
    });

    // Reset both password fields if they don't match
    form.addEventListener('submit', (event) => {
        if (password.value !== confirmPassword.value) {
            event.preventDefault();
            passwordError.textContent = 'Passwords do not match';
            password.value = '';
            confirmPassword.value = '';
            password.focus();
        }
    });

    // Page rating live update
    pageRating.addEventListener('input', () => {
        ratingValue.textContent = pageRating.value;
    });
});