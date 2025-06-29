// scripts/push-notification.js

// 🔑 Ganti dengan VAPID PUBLIC KEY dari backend kamu
const VAPID_PUBLIC_KEY = 'BM8s1W9x9Yl5kZ3Io3QpLqz3kEfh0Ua4bvFlZzQOyEmnLV0kJYXp_6d5FX7Y9-k0zIYV8r7M8XPrxS7Zg9qBvRE';

/**
 * Inisialisasi Push Notification:
 * - Minta izin notifikasi
 * - Subscribe ke push manager
 * - Kirim subscription ke backend
 */
export async function initPush() {
  if (!('Notification' in window)) {
    console.warn('❌ Push Notification tidak didukung oleh browser.');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.warn('⚠️ Izin notifikasi ditolak oleh pengguna.');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    await fetch('https://story-api.dicoding.dev/v1/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // sesuaikan jika backend butuh token
      },
      body: JSON.stringify(subscription),
    });

    console.log('✅ Berhasil subscribe Push Notification!');
  } catch (err) {
    console.error('❌ Gagal melakukan subscribe push:', err);
  }
}

/**
 * Fungsi utilitas untuk konversi VAPID key
 * @param {string} base64String 
 * @returns {Uint8Array}
 */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

/**
 * Minta izin eksplisit dan tampilkan notifikasi feedback
 */
export function requestPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(status => {
      if (status === 'granted') {
        showNotification('Notifikasi diaktifkan!');
      } else {
        console.warn('⚠️ Notifikasi tidak diizinkan.');
      }
    });
  } else {
    console.warn('❌ Notification API tidak didukung.');
  }
}

/**
 * ✅ Fungsi ekspor untuk menampilkan notifikasi secara manual
 * Diperlukan saat polling data baru
 * @param {string} message - isi notifikasi
 */
export function showNotification(message) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        reg.showNotification('Story App', {
          body: message,
          icon: '/assets/icons/icon-192.png',
        });
      }
    });
  }
}
