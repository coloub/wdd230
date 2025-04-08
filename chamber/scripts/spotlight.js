// Function to fetch members data
async function getMembers() {
    try {
        const response = await fetch('data/members.json'); // Adjust path as needed
        if (response.ok) {
            const data = await response.json();
            return data.members;
        }
        throw new Error('Failed to fetch members data');
    } catch (error) {
        console.error('Error loading members:', error);
        return [];
    }
}

// Function to get random silver/gold members
function getRandomSpotlightMembers(members, count) {
    // Filter for silver and gold members
    const eligibleMembers = members.filter(member => 
        member.membershipLevel === 'silver' || member.membershipLevel === 'gold'
    );
    
    // Shuffle array
    const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
    
    // Return requested number of members
    return shuffled.slice(0, count);
}

// Function to create spotlight HTML
function createSpotlightHtml(member) {
    return `
        <div class="spotlight card">
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Icon">
            <p>"${member.slogan}"</p>
            <hr>
            <p>${member.email}</p>
            <p>${member.phone}</p>
        </div>
    `;
}

// Function to display spotlight members
async function displaySpotlights() {
    const spotlightsContainer = document.querySelector('.spotlights');
    if (!spotlightsContainer) return;

    const members = await getMembers();
    const spotlightMembers = getRandomSpotlightMembers(members, 3);
    
    spotlightsContainer.innerHTML = spotlightMembers
        .map(member => createSpotlightHtml(member))
        .join('');
}

// Initialize spotlights
displaySpotlights();