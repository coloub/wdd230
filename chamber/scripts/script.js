// Chamber of Commerce JavaScript

// Toggle Menu Button
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    menuButton.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
    });
    
    // Current Date in Header
    const currentDateElement = document.getElementById('current-date');
    const now = new Date();
    
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    
    // Footer Year and Last Modified
    const currentYearElement = document.getElementById('current-year');
    const lastModifiedElement = document.getElementById('last-modified');
    
    currentYearElement.textContent = now.getFullYear();
    lastModifiedElement.textContent = document.lastModified;
});