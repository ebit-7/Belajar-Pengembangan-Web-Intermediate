const CACHE_NAME = 'story-app-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/bundle.js',
  '/manifest.json',
  '/assets/styles.css',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  '/assets/libs/leaflet/leaflet.css',
  '/assets/libs/leaflet/leaflet.js',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Support hash routes: always serve index.html for any hash
  if (url.origin === location.origin && url.hash && url.pathname === '/') {
    event.respondWith(caches.match('/index.html'));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(resp => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resp.clone()));
          return resp;
        })
        .catch(() => {
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// Push notification
self.addEventListener('push', event => {
  let data = {
    title: 'Cerita Baru!',
    body: 'Cek cerita terbaru di Story App!',
    icon: '/assets/icons/icon-192.png',
  };
  if (event.data) {
    try { data = event.data.json(); }
    catch { data.body = event.data.text(); }
  }
  const options = { body: data.body, icon: data.icon, badge: '/assets/icons/icon-192.png', data: { url: '/' } };
  event.waitUntil(self.registration.showNotification(data.title || 'Notifikasi', options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientsArr => {
      const client = clientsArr.find(c => c.url === '/' && 'focus' in c);
      return client ? client.focus() : clients.openWindow('/');
    })
  );
});
