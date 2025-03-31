// URL base para tu repositorio (ajustar según tu nombre de usuario)
const baseURL = "https://coloub.github.io/wdd230/";

// URL del archivo JSON de enlaces
const linksURL = "https://coloub.github.io/wdd230/data/links.json";

// Seleccionar el contenedor de la lista de actividades
const learningActivitiesList = document.querySelector('.learning-activities ul');

// Función asíncrona para obtener los datos de enlaces
async function getLinks() {
  try {
    const response = await fetch(linksURL);
    
    // Verificar si la respuesta es correcta
    if (response.ok) {
      const data = await response.json();
      // Mostrar los enlaces en la página
      displayLinks(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log("Error fetching links data:", error);
    // Mostrar un mensaje de error en la lista
    learningActivitiesList.innerHTML = '<li>Error loading learning activities. Please try again later.</li>';
  }
}

// Función para mostrar los enlaces en la página
function displayLinks(data) {
  // Limpiar el contenido actual
  learningActivitiesList.innerHTML = '';
  
  // Iterar por cada semana
  data.weeks.forEach(weekData => {
    // Crear un elemento de lista para cada semana
    const li = document.createElement('li');
    
    // Verificar si hay enlaces
    if (weekData.links.length > 0) {
      // Agregar el número de semana
      li.textContent = `${weekData.week}: `;
      
      // Iterar por cada enlace de la semana
      weekData.links.forEach((link, index) => {
        // Crear un elemento de enlace
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        
        // Agregar el enlace al elemento de lista
        li.appendChild(a);
        
        // Agregar separador si no es el último enlace
        if (index < weekData.links.length - 1) {
          const separator = document.createTextNode(' | ');
          li.appendChild(separator);
        }
      });
      
      // Agregar el elemento de lista a la lista principal
      learningActivitiesList.appendChild(li);
    }
  });
}

// Llamar a la función para cargar los enlaces
getLinks();