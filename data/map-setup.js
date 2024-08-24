window.map = L.map('map', {
    attributionControl: false,
    zoomControl: false
}).setView([37, 138], 5);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png').addTo(window.map);