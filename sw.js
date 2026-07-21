const CACHE_NAME = 'caresync-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install event - cache all assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS).catch(err => {
          console.warn('Some assets failed to cache:', err);
          // Continue even if some assets fail
          return cache.addAll(ASSETS.filter(asset => asset !== './'));
        });
      })
      .catch(err => console.error('Cache open failed:', err))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
});

// Fetch event - stale-while-revalidate strategy
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached response immediately if available
      if (cachedResponse) {
        // Update cache in background
        fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
          })
          .catch(err => console.warn('Background fetch failed:', err));
        
        return cachedResponse;
      }

      // If not cached, fetch from network
      return fetch(event.request)
        .then(networkResponse => {
          // Cache successful responses
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(err => {
          // Return offline fallback if available
          console.warn('Fetch failed:', err);
          return caches.match('./index.html');
        });
    })
  );
});

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});