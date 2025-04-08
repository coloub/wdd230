// Seleccionar elementos HTML en la sección del clima
const weatherIcon = document.createElement('img');
const weatherTemp = document.querySelector('.weather-temp');
const weatherLocation = document.querySelector('.weather-location');
const weatherDetailsDiv = document.querySelector('.weather-details');

// Tu API key de OpenWeatherMap
const apiKey = '99b73c73a4f0131e259a3d30ffca705a';

// Coordenadas para Sucre, Bolivia (aproximadas: -19.03, -65.26)
const lat = -19.03;
const lon = -65.26;

// URLs para el clima actual y el pronóstico
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Función para obtener el clima actual
async function getCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para obtener el pronóstico de 3 días
async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
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
    weatherIcon.setAttribute('width', '60');
    weatherIcon.setAttribute('height', '60');
    
    // Actualizar el texto del clima
    weatherTemp.innerHTML = `<strong>${temp}°C</strong> - ${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
    weatherTemp.appendChild(weatherIcon);
    
    // Actualizar el nombre de la ciudad
    weatherLocation.innerHTML = `<strong>${data.name}, ${data.sys.country}</strong>`;
    
    // Actualizar información adicional
    const windSpeed = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    
    if (windSpeed) {
        windSpeed.textContent = `${Math.round(data.wind.speed)} m/s`;
    }
    
    if (humidity) {
        humidity.textContent = `${data.main.humidity}%`;
    }
}

// Función para mostrar el pronóstico de 3 días
function displayForecast(data) {
    // Crear el contenedor del pronóstico si no existe
    let forecastContainer = document.querySelector('.weather-forecast');
    if (!forecastContainer) {
        forecastContainer = document.createElement('div');
        forecastContainer.className = 'weather-forecast';
        weatherDetailsDiv.after(forecastContainer);
    }

    // Limpiar el contenedor
    forecastContainer.innerHTML = '<h4>3-Day Forecast</h4>';

    // Obtener pronósticos únicos por día (al mediodía)
    const dailyForecasts = [];
    const processedDates = new Set();

    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dateString = date.toLocaleDateString();

        // Solo tomar un pronóstico por día
        if (!processedDates.has(dateString) && date.getHours() >= 12 && date.getHours() <= 15) {
            processedDates.add(dateString);
            dailyForecasts.push(forecast);
        }
    });

    // Tomar solo los primeros 3 días
    const threeDayForecast = dailyForecasts.slice(0, 3);

    // Crear elementos para cada día
    threeDayForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = new Intl.DateTimeFormat('en-EN', { weekday: 'short' }).format(date);
        const temp = Math.round(day.main.temp);
        const desc = day.weather[0].description;
        const icon = day.weather[0].icon;

        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <span class="forecast-date">${dayName}</span>
            <img src="https://openweathermap.org/img/w/${icon}.png" 
                 alt="${desc}" 
                 width="40" 
                 height="40">
            <span class="forecast-temp">${temp}°C</span>
            <span class="forecast-desc">${desc}</span>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

// Agregar estilos CSS dinámicamente
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .weather-forecast {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #ccc;
    }

    .weather-forecast h4 {
        margin-bottom: 1rem;
        text-align: center;
    }

    .forecast-day {
        display: grid;
        grid-template-columns: 1fr 40px 1fr 1fr;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
    }

    .forecast-date {
        font-weight: bold;
    }

    .forecast-temp {
        font-weight: bold;
        color: #2b5797;
    }

    .forecast-desc {
        font-size: 0.9em;
        color: #666;
    }
`;
document.head.appendChild(styleSheet);

// Inicializar
getCurrentWeather();
getForecast();