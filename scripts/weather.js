// Seleccionar elementos HTML en la sección Information
const weatherIcon = document.createElement('img');
const weatherTemp = document.querySelector('.information p:nth-child(2)');
const weatherCity = document.querySelector('.information p:first-child');

// Tu API key de OpenWeatherMap
const apiKey = '99b73c73a4f0131e259a3d30ffca705a';

// Coordenadas para Sucre, Bolivia (aproximadas: -19.03, -65.26)
const lat = -19.03;
const lon = -65.26;

// Construir la URL de la API
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Función de fetch para la API
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // solo para pruebas
      displayResults(data); // Mostrar datos en el HTML
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Función para mostrar los resultados en el HTML
function displayResults(data) {
  // Actualizar la temperatura y descripción
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  
  // Obtener el ícono del clima
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  
  // Configurar el elemento de imagen
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  weatherIcon.setAttribute('width', '50');
  weatherIcon.setAttribute('height', '50');
  weatherIcon.style.verticalAlign = 'middle';
  weatherIcon.style.marginLeft = '10px';
  
  // Actualizar el texto del clima
  weatherTemp.innerHTML = `<strong>${temp}°C - ${desc.charAt(0).toUpperCase() + desc.slice(1)}</strong> `;
  weatherTemp.appendChild(weatherIcon);
  
  // Actualizar el nombre de la ciudad
  weatherCity.innerHTML = `<strong>${data.name}, ${data.sys.country}</strong>`;
}

// Llamar a la función fetch de la API
apiFetch();