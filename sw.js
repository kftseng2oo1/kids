// 小小益智樂園：整個樂園共用一個 Service Worker（網路優先，離線用快取）
var C = 'kids-v2';
var PRE = [
  './', 'index.html', 'manifest.json', 'icon.svg', 'icon-192.png', 'icon-512.png',
  'zoo/', 'zoo/index.html',
  'sound/', 'sound/index.html',
  'number/', 'number/index.html',
  'warmmy/', 'warmmy/index.html', 'warmmy/icons/icon.svg',
  'zhuyin/', 'zhuyin/index.html', 'color/', 'color/index.html',
  'mole/', 'mole/index.html', 'sort/', 'sort/index.html'
];
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(function (c) {
    return Promise.all(PRE.map(function (u) { return c.add(u).catch(function () {}); }));
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var u = new URL(e.request.url);
  var same = u.origin === self.location.origin;
  var font = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (!same && !font) return; // 其他外部 API（如 freesound）直接走網路
  e.respondWith(fetch(e.request).then(function (r) {
    if (r && (r.ok || r.type === 'opaque')) { var cp = r.clone(); caches.open(C).then(function (c) { c.put(e.request, cp); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (m) { return m || caches.match('index.html'); });
  }));
});
