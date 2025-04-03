/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.

// Import Workbox modules
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

// Precache manifest will be injected by workbox-webpack-plugin
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30,
      }),
    ],
  })
);

// Cache images with a cache-first strategy
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// Cache CSS and JavaScript Files
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Cache API calls with network-first strategy
workbox.routing.registerRoute(
  new RegExp('/api/.*'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
);

// Default strategy for all other routes - network first with fallback to cache
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'document',
  new workbox.strategies.NetworkFirst({
    cacheName: 'document-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // 1 day
      }),
    ],
  })
);

// Fallback to offline page if network is unavailable
workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return workbox.precaching.matchPrecache('/offline.html');
  }
  
  // For images, return a placeholder
  if (event.request.destination === 'image') {
    return caches.match('/images/offline-image.png');
  }
  
  return Response.error();
});

// Background sync for failed form submissions
const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('formQueue', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

workbox.routing.registerRoute(
  /\/api\/submit-form/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

// Skip waiting and claim clients to update service worker immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icon.ico',
    badge: '/icon.ico',
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      const url = event.notification.data.url;
      
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no window/tab is already open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
