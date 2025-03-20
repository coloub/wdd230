// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
    // Select all images with data-src attribute
    const imagesToLoad = document.querySelectorAll('img[data-src]');
    
    // Optional parameters for Intersection Observer
    const imgOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px 50px 0px"
    };
    
    const loadImages = (image) => {
        // Replace src with data-src
        image.setAttribute('src', image.getAttribute('data-src'));
        
        // Remove data-src attribute once image is loaded
        image.onload = () => {
            image.removeAttribute('data-src');
        };
    };
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImages(entry.target);
                    imgObserver.unobserve(entry.target);
                }
            });
        }, imgOptions);
        
        // Observe each image
        imagesToLoad.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Just load all images if IntersectionObserver is not supported
        imagesToLoad.forEach(img => {
            loadImages(img);
        });
    }
    
    // Visit tracking using localStorage
    const visitMessageElement = document.getElementById('visit-message');
    
    // Get the current visit timestamp
    const currentVisit = Date.now();
    
    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (!lastVisit) {
        // First visit
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the difference in days
        const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            // Less than a day
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            // Exactly 1 day
            visitMessageElement.textContent = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            visitMessageElement.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }
    
    // Store the current visit for next time
    localStorage.setItem('lastVisit', currentVisit);
});