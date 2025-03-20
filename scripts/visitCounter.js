// Contador de visitas
let visitCount = localStorage.getItem('visitCount');

if (visitCount) {
    visitCount = parseInt(visitCount) + 1;
} else {
    visitCount = 1;
}

localStorage.setItem('visitCount', visitCount);

document.querySelector('.information p:last-child').innerHTML = `<strong>Page Visits:</strong> ${visitCount}`;