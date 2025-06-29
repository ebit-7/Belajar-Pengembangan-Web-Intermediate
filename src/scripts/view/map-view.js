export function renderHomeMap(stories) {
  const cnt = document.getElementById('homeMap');
  if (!cnt || typeof L === 'undefined') return;

  const map = L.map('homeMap').setView([-2.5, 118], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  stories.forEach(story => {
    if (story.lat && story.lon) {
      L.marker([story.lat, story.lon]).addTo(map)
        .bindPopup(`<b>${story.name || 'Pengguna'}</b><br>${story.description}`)
        .openPopup();
    }
  });
}

export function renderAddMap({ onLocationSelect }) {
  const cnt = document.getElementById('addMap');
  if (!cnt || typeof L === 'undefined') return;

  const map = L.map('addMap').setView([-2.5, 118], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  let currentMarker = null;
  map.on('click', e => {
    const lat = e.latlng.lat.toFixed(6);
    const lon = e.latlng.lng.toFixed(6);

    if (currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker([lat, lon]).addTo(map)
      .bindPopup(`Lokasi:<br>Lat: ${lat}<br>Lon: ${lon}`).openPopup();

    onLocationSelect({ lat, lon });
  });
}
