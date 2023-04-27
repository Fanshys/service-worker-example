const staticCacheName = 'static-cache-v1';
const dynamicCacheName = 'dynamic-cache-v1';

const assetUrls = [
  'index.html',
  '/index.js',
  '/index.css'
];

self.addEventListener('install', async () => {
  const cache = await caches.open(staticCacheName);

  await cache.addAll(assetUrls);

  // Если хотим принудительно запустить новую версию воркера
  // self.skipWaiting();
});

self.addEventListener('activate', async () => {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});


async function cacheFirst(request) {
  const cached = await caches.match(request);

  return cached ?? await fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);

  try {
    const response = await fetch(request);

    await cache.put(request, response.clone());

    return response;
  } catch (e) {
    const cached = await cache.match(request);

    return cached;
  }
}
