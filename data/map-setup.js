window.map = L.map('map', {
    attributionControl: false,
    zoomControl: false
}).setView([37, 138], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(window.map);