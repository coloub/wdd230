// Contact form handling for Sucre Chamber of Commerce

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!fullName || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Clear form fields
            contactForm.reset();
            
            // Show success message
            const formSection = document.querySelector('.contact-form');
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h4>Thank You!</h4>
                <p>Your message has been sent successfully. We will get back to you as soon as possible.</p>
                <button class="close-message">OK</button>
            `;
            
            formSection.appendChild(successMessage);
            
            // Add event listener to close message
            const closeButton = successMessage.querySelector('.close-message');
            closeButton.addEventListener('click', () => {
                successMessage.remove();
            });
        });
    }
    
    // Styles for success message
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            text-align: center;
        }
        
        .success-message h4 {
            margin-top: 0;
            color: #155724;
        }
        
        .close-message {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 1rem;
            font-weight: bold;
        }
        
        .close-message:hover {
            background-color: #218838;
        }
    `;
    
    document.head.appendChild(style);
});