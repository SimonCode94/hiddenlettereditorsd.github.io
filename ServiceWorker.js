const cacheName = "DefaultCompany-Dyeing-1.0";
const contentToCache = [
    "Build/bb0d9ecdb05db3e84da20bd14a4f84dc.loader.js",
    "Build/6b446a81fdcba292089045aa029eeded.framework.js",
    "Build/0f3df9ee38a257eccc5d84683cc32f54.data",
    "Build/59e3d5b95ac9a8cc8c6d84dd91b5fdb3.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
