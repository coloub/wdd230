// Banner para meet and greet
function setupMeetGreetBanner() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Show banner only on Monday (1), Tuesday (2), and Wednesday (3)
    if (dayOfWeek >= 1 && dayOfWeek <= 3) {
        const banner = document.createElement('div');
        banner.className = 'meet-greet-banner';
        banner.innerHTML = `
            <p>🤝 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.</p>
            <button class="close-banner" aria-label="Close banner">✕</button>
        `;
        
        document.body.insertBefore(banner, document.body.firstChild);
        
        // Add close functionality
        const closeButton = banner.querySelector('.close-banner');
        closeButton.addEventListener('click', () => {
            banner.remove();
        });
    }
}
setupMeetGreetBanner();