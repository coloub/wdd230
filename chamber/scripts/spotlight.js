document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch the members data
        const response = await fetch('data/members.json');
        const data = await response.json();
        
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
            
            spotlightCard.innerHTML = `
                <h3>${member.name}</h3>
                <img src="${member.imageFile}" alt="${member.name} Icon">
                <p>"${member.description}"</p>
                <hr>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" class="website-link">Visit Website</a>
            `;
            
            spotlightsSection.appendChild(spotlightCard);
        });
        
    } catch (error) {
        console.error('Error loading member spotlights:', error);
    }
});