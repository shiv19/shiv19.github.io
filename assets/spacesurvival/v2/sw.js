const CACHE_NAME = "space-survival-v2-cache-v3";
const CACHE_PREFIX = "space-survival-v2-cache-";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/index-Ds8Yz0xP.css",
  "./assets/index-Dqf2k5Jc.js",
  "./audio/asteroid-hit-crunch.mp3",
  "./audio/asteroid-hit-crunch.ogg",
  "./audio/asteroid-hit.mp3",
  "./audio/asteroid-hit.ogg",
  "./audio/laser-fire.mp3",
  "./audio/laser-fire.ogg",
  "./audio/lofi-loop.mp3",
  "./audio/lofi-loop.ogg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return new Response("", { status: 504, statusText: "Offline" });
        });
    })
  );
});
