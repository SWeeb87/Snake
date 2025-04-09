self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    self.skipWaiting(); // Forza l'installazione immediata
});

self.addEventListener('activate', function (e) {
    console.log('[Service Worker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.map(function (key) {
                    console.log(`[Service Worker] Deleting cache: ${key}`);
                    return caches.delete(key); // Elimina tutte le cache salvate
                })
            );
        })
    );
    return self.clients.claim(); // Assicura che il nuovo Service Worker prenda subito il controllo
});

self.addEventListener('fetch', function (e) {
    console.log(`[Service Worker] Fetching (no cache): ${e.request.url}`);
    e.respondWith(fetch(e.request)); // Nessuna cache, sempre dal server
});
