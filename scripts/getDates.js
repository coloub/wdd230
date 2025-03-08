// Obtener el año actual
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// Obtener la ultima fecha de modificacion
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;