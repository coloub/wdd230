const baseURL = "https://coloub.github.io/wdd230/";
const linksURL = "data/links.json";

// Select the learning activities list container
const learningActivitiesList = document.querySelector('.learning-activities ul');

// Asynchronous function to fetch links data
async function getLinks() {
  try {
    const response = await fetch(linksURL);
    
    // Check if response is ok
    if (response.ok) {
      const data = await response.json();
      // Display links on the page
      displayLinks(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log("Error fetching links data:", error);
    // Show error message in the list
    learningActivitiesList.innerHTML = '<li>Error loading learning activities. Please try again later.</li>';
  }
}

// Function to display links on the page
function displayLinks(data) {
  // Clear current content
  learningActivitiesList.innerHTML = '';
  
  // Iterate through each week
  data.weeks.forEach(weekData => {
    // Create a list item for each week
    const li = document.createElement('li');
    
    // Check if there are links
    if (weekData.links.length > 0) {
      // Add week number
      li.textContent = `${weekData.week}: `;
      
      // Iterate through each link of the week
      weekData.links.forEach((link, index) => {
        // Create link element
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        
        // Add link to list item
        li.appendChild(a);
        
        // Add separator if not the last link
        if (index < weekData.links.length - 1) {
          const separator = document.createTextNode(' | ');
          li.appendChild(separator);
        }
      });
      
      // Add list item to main list
      learningActivitiesList.appendChild(li);
    }
  });
}

// Call function to load links
getLinks();