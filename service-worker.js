const filesToCache = [
  '/',
  'styles/jquery-ui-1.12.1',
  'styles/jquery-ui-themes-1.12.1',
  'styles.css',
  'images/chicken1.png',
  'images/cow2.png',
  'images/goat.png',
  'images/sheep4.png',
  'images/potato1.png',
  'images/corn2.png',
  'images/lettuce.png',
  'images/broccoli.png',
  'images/cowbow_farm.jpg',
];

const staticCacheName = 'pagws-cache-v1';


self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache)
      })
  );
});

self.addEventListener('activate', event => {
  console.log('service worker is activating...')
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
          .then(response => {
            return caches.open(staticCacheName)
              .then(cache => {
                cache.put(event.request.url, response.clone());
                return response;
              });
          });
      })
      .catch(error => {
        console.log('error, could not fetch');
      })
  )
})
