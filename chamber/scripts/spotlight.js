document.addEventListener("DOMContentLoaded", () => {
    const spotlightSection = document.getElementById("spotlights");

    // Fetch the JSON data
    fetch("chamber/data/members.json")
        .then(response => response.json())
        .then(data => {
            const members = data.members;

            // Filter members with Gold or Silver membership levels
            const qualifiedMembers = members.filter(member => 
                member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
            );

            // Randomly select 2-3 members
            const selectedMembers = [];
            while (selectedMembers.length < 3 && qualifiedMembers.length > 0) {
                const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
                selectedMembers.push(qualifiedMembers.splice(randomIndex, 1)[0]);
            }

            // Generate HTML for the selected members
            selectedMembers.forEach(member => {
                const memberCard = document.createElement("div");
                memberCard.classList.add("spotlight-card");
                memberCard.innerHTML = `
                    <img src="${member.imageFile}" alt="${member.name} Logo" class="spotlight-image">
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                spotlightSection.appendChild(memberCard);
            });
        })
        .catch(error => console.error("Error loading members:", error));
});