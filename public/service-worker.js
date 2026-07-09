const CACHE_NAME = "meu-app-v1";

const ARQUIVOS_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ARQUIVOS_CACHE);
      })
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(networkResponse => {
          // Cache dinâmico para garantir que os arquivos compilados do React (JS/CSS com hash)
          // sejam salvos em cache offline à medida que forem carregados
          if (
            networkResponse && 
            networkResponse.status === 200 && 
            networkResponse.type === 'basic' &&
            (
              event.request.url.includes('/assets/') || 
              event.request.url.includes('.svg') || 
              event.request.url.includes('.woff2') || 
              event.request.url.includes('.js') || 
              event.request.url.includes('.css') || 
              event.request.url.includes('/favicon.svg')
            )
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
  );
});
