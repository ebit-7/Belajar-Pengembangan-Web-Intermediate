import { renderAddMap } from './map-view.js';

let stream = null;

// Navigasi ke halaman home
export function navigateToHome() {
  window.location.hash = '#/home';
}

// Tampilkan notifikasi sukses
export function showSuccess(message) {
  alert(`✅ ${message}`);
}

// Tampilkan notifikasi error
export function showError(message) {
  alert(`❌ ${message}`);
}

// Tampilkan atau sembunyikan indikator loading
export function showLoading(state) {
  const loading = document.querySelector('.loading-indicator');
  if (loading) {
    loading.style.display = state ? 'block' : 'none';
  }
}

export function renderAddForm({ onSubmit }) {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <section class="add-story-container" aria-labelledby="add-story-title">
      <h2 id="add-story-title">Tambah Cerita</h2>
      <form id="storyForm" class="styled-form" aria-describedby="formDesc">
        <p id="formDesc">Isi formulir ini untuk menambahkan cerita Anda</p>

        <label for="description">Deskripsi:</label>
        <input type="text" id="description" name="description" placeholder="Tulis deskripsi singkat..." required aria-required="true" />

        <label>Ambil Foto:</label>
        <div class="camera-container">
          <video id="camera" autoplay playsinline aria-label="Pratinjau Kamera"></video>
          <button type="button" id="takePhoto" class="btn-primary" aria-label="Ambil Foto">Ambil Foto</button>
        </div>

        <canvas id="canvas" style="display:none;"></canvas>

        <label for="lat">Latitude:</label>
        <input type="number" id="lat" name="lat" required step="any" placeholder="Contoh: -6.200000" aria-required="true" />

        <label for="lon">Longitude:</label>
        <input type="number" id="lon" name="lon" required step="any" placeholder="Contoh: 106.816666" aria-required="true" />

        <button type="submit" class="btn-submit">Kirim Cerita</button>
      </form>

      <div id="addMap" class="map-container" aria-label="Peta lokasi cerita"></div>
      <div id="loading" class="loading-indicator" style="display:none;" aria-live="polite" role="status">Mengirim...</div>
    </section>
  `;

  const form = document.getElementById('storyForm');
  const video = document.getElementById('camera');
  const canvas = document.getElementById('canvas');
  const takePhotoButton = document.getElementById('takePhoto');

  let capturedBlob = null;

  // Akses kamera
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then((mediaStream) => {
      stream = mediaStream;
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error('Gagal membuka kamera:', error);
      showError('Kamera tidak tersedia atau izin ditolak.');
    });

  // Ambil foto dari kamera
  takePhotoButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      capturedBlob = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      showSuccess('Foto berhasil diambil!');
    }, 'image/jpeg');
  });

  // Kirim formulir
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const description = form.description.value.trim();
    const lat = form.lat.value.trim();
    const lon = form.lon.value.trim();

    if (!capturedBlob) {
      showError('Silakan ambil foto terlebih dahulu!');
      return;
    }

    onSubmit({ description, photo: capturedBlob, lat, lon });
  });

  // Peta pemilihan lokasi
  renderAddMap({
    onLocationSelect: ({ lat, lon }) => {
      form.lat.value = lat;
      form.lon.value = lon;
    }
  });
}

// Hentikan kamera saat hash berubah
window.addEventListener('hashchange', () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
});
