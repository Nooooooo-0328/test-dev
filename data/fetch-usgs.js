function updateEarthquakeData() {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
        .then(response => response.json())
        .then(data => {
            const earthquakes = data.features;
            const latestEarthquake = earthquakes.reduce((latest, current) => {
                return current.properties.time > latest.properties.time ? current : latest;
            });

            const coords = latestEarthquake.geometry.coordinates;
            const mag = latestEarthquake.properties.mag;
            const place = latestEarthquake.properties.place;

            const time = new Date(latestEarthquake.properties.time);
            const formattedTime = `${time.getFullYear()}/${String(time.getMonth() + 1).padStart(2, '0')}/${String(time.getDate()).padStart(2, '0')} ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;

            const icon = L.divIcon({
                className: 'icon',
                html: '<img src="data/hypocenter.png" style="width: 50px; height: 50px;" />',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });

            if (window.currentMarker) {
                window.map.removeLayer(window.currentMarker);
            }

            window.currentMarker = L.marker([coords[1], coords[0]], { icon }).addTo(window.map);

            window.map.setView([coords[1], coords[0]], 2.5); 

            document.getElementById('info').innerHTML = `
                <h3>USGS 地震情報</h3>
                <p><b>発生時刻(JST):</b> ${formattedTime}</p>
                <p><b>震源:</b> ${place}</p>
                <p><b>マグニチュード:</b> M${mag}</p>
                <hr>
                <h3>MAP 情報</h3>
                Zoom Level: 3.5<br>
                Version: 1.0.0
            `;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

updateEarthquakeData();

setInterval(updateEarthquakeData, 2000);
