document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch the members data
        const response = await fetch('data/members.json');
        const data = await response.json();
        
        // Define membership benefits
        const membershipBenefits = {
            "Gold": [
                "Featured placement in directory",
                "Business training events",
                "Marketing support",
                "Networking events access"
            ],
            "Silver": [
                "Business directory listing",
                "Event discounts",
                "Monthly workshops"
            ]
        };

        // Filter for gold and silver members
        const qualifiedMembers = data.members.filter(member => 
            member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
        );
        
        // Function to get random members
        function getRandomMembers(arr, count) {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        
        // Get 2-3 random members (let's make it 3 for this implementation)
        const selectedMembers = getRandomMembers(qualifiedMembers, 3);
        
        // Get the spotlights container
        const spotlightsSection = document.querySelector('.spotlights');
        spotlightsSection.innerHTML = ''; // Clear existing spotlights
        
        // Create and append spotlight cards for each selected member
        selectedMembers.forEach(member => {
            const spotlightCard = document.createElement('div');
            spotlightCard.className = 'spotlight card';
            
            // Create benefits list HTML
            const benefitsList = membershipBenefits[member.membershipLevel]
                .map(benefit => `<li>${benefit}</li>`)
                .join('');
            
            spotlightCard.innerHTML = `
                <div class="membership-badge ${member.membershipLevel.toLowerCase()}-member">
                    ${member.membershipLevel} Member
                </div>
                <h3>${member.name}</h3>
                <img src="${member.imageFile}" alt="${member.name} Icon">
                <p class="member-description">"${member.description}"</p>
                <hr>
                <div class="benefits-section">
                    <h4>Membership Benefits:</h4>
                    <ul class="benefits-list">
                        ${benefitsList}
                    </ul>
                </div>
                <div class="contact-section">
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank" class="website-link">Visit Website</a>
                </div>
            `;
            
            spotlightsSection.appendChild(spotlightCard);
        });
        
    } catch (error) {
        console.error('Error loading member spotlights:', error);
    }
});