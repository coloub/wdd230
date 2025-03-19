document.addEventListener('DOMContentLoaded', function() {
    const lastModified = document.getElementById('lastModified');
    const currentDate = new Date();
    lastModified.textContent = currentDate.toLocaleString();
});