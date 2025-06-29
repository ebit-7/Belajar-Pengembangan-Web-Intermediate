// scripts/api/story-api.js

const BASE_URL = 'https://story-api.dicoding.dev/v1';

/**
 * Ambil token dari localStorage
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * Ambil daftar cerita
 */
export async function getStories() {
  const token = getToken();
  if (!token) throw new Error('Token tidak ditemukan. Silakan login.');

  const res = await fetch(`${BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Gagal memuat cerita');

  const data = await res.json();
  return data.listStory;
}

/**
 * Kirim cerita baru
 * @param {Object} param0 - data cerita
 */
export async function addStory({ description, photo, lat, lon }) {
  const token = getToken();
  if (!token) throw new Error('Token tidak ditemukan. Silakan login.');

  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);

  if (lat && lon) {
    formData.append('lat', lat);
    formData.append('lon', lon);
  }

  const res = await fetch(`${BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Gagal mengirim cerita');
  }

  return res.json();
}

/**
 * ✅ [Opsional] Cek cerita terbaru secara manual
 * Backend harus menyediakan endpoint `/stories/latest`
 */
export async function checkNewStories() {
  const token = getToken();
  if (!token) throw new Error('Token tidak ditemukan.');

  const response = await fetch(`${BASE_URL}/stories/latest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Gagal mengambil cerita terbaru');

  const result = await response.json();
  return result; // bisa { listStory: [...] } atau sesuai backend
}
