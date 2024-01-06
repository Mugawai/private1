self.addEventListener('install', event => {
    event.waitUntil(
       caches.open('cache-v1').then(cache => {
         return cache.addAll([
           '../',
           '../manifest.json',
           '../assets/images/awal.webp',
           // tambahkan file lain yang perlu di-cache disini
         ]);
       })
    );
   });
   
   self.addEventListener('fetch', event => {
    event.respondWith(
       caches.match(event.request).then(response => {
         return response || fetch(event.request);
       })
    );
   });
   
   self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
       body: data.body,
       icon: data.icon,
       badge: data.badge,
       vibrate: data.vibrate,
       sound: data.sound,
       actions: data.actions,
       tag: data.tag,
       image: data.image,
       renotify: data.renotify,
       silent: data.silent,
       timestamp: data.timestamp,
       requireInteraction: data.requireInteraction,
       data: data.data,
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
   });
