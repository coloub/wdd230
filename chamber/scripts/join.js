// Timestamp
document.addEventListener('DOMContentLoaded', () => {
    // Set hidden timestamp field with current date and time
    const timestampField = document.getElementById('timestamp');
    timestampField.value = new Date().toLocaleString();
});