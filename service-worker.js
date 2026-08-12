/* ============================================================
   KrishiX – Progressive Web App (PWA) Service Worker
   Enables Offline Caching for Kopargaon Farmers
   ============================================================ */

const CACHE_NAME = 'krishix-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './api.js',
  './map-tracker.js',
  './app.js',
  './manifest.json',
  './assets/krishix_logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('🌾 KrishiX Service Worker: Caching App Shell...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Network first, fallback to cache
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
