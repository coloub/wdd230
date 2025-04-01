// Get the buttons and display element
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// Add event listeners for the buttons
gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});

// Fetch the members data from the JSON file
async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error loading member data:', error);
    }
}

// Display the members on the page
function displayMembers(members) {
    const article = document.querySelector('article');
    
    members.forEach(member => {
        // Create elements for the member
        const section = document.createElement('section');
        
        // Create and configure the image
        const img = document.createElement('img');
        img.src = member.imageFile;
        img.alt = `Logo of ${member.name}`;
        img.loading = "lazy";
        
        // Create and configure the heading
        const h3 = document.createElement('h3');
        h3.textContent = member.name;
        
        // Create address paragraph
        const addressPara = document.createElement('p');
        addressPara.textContent = member.address;
        
        // Create phone paragraph
        const phonePara = document.createElement('p');
        phonePara.textContent = member.phone;
        
        // Create and configure the website link
        const websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.textContent = "Website";
        websiteLink.target = "_blank";
        
        // Create membership level paragraph
        const membershipPara = document.createElement('p');
        membershipPara.textContent = `Membership: ${member.membershipLevel}`;
        
        // Create year founded paragraph
        const yearPara = document.createElement('p');
        yearPara.textContent = `Est. ${member.yearFounded}`;
        
        // Create details "button"
        const detailsLink = document.createElement('a');
        detailsLink.href = "#";
        detailsLink.textContent = "Details";
        detailsLink.classList.add("details-button");
        
        // Append all elements to the section
        section.appendChild(img);
        section.appendChild(h3);
        section.appendChild(addressPara);
        section.appendChild(phonePara);
        section.appendChild(websiteLink);
        section.appendChild(membershipPara);
        section.appendChild(yearPara);
        section.appendChild(detailsLink);
        
        // Append the section to the article
        article.appendChild(section);
    });
}

// Set the default view to grid
display.classList.add("grid");
display.classList.remove("list");

// Load the members when the page loads
document.addEventListener("DOMContentLoaded", getMembers);