// Declare the URL for the JSON data
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Select the HTML element where we'll place our prophet cards
const cards = document.querySelector('#cards');

// Async function to fetch the prophet data
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets); // Temporary for testing
    displayProphets(data.prophets);
}

// Function to build and display prophet cards
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements for each prophet card
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        
        // Build the h2 content with the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        // Build the image portrait by setting all relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        
        // Append the elements to the card
        card.appendChild(fullName);
        card.appendChild(portrait);
        
        // Append the card to the cards div
        cards.appendChild(card);
    });
};

// Call the function to fetch and display prophet data
getProphetData();