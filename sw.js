/* Binaural Visions - Service Worker - © 2026 MF Gregoire en zoon */
const CACHE_NAME = 'binaural-visions-v2';
const URLS_TO_CACHE = [
  '/binaural-visions/',
  '/binaural-visions/binaural-app-voor-mezelf-en-store.html',
  '/binaural-visions/manifest.json',
  '/binaural-visions/icon_512.png',
  '/binaural-visions/icon_192.png',
  '/binaural-visions/privacy.html'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});