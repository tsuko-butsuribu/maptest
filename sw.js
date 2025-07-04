// PWA対応：Service Worker

var CACHE_NAME = 'task-management';
var urlsToCache = [
    './', // index.html のルート
    './index.html',
    './index.css',
    './manifest.json',
    './img/icon.png' // アイコン画像もキャッシュ対象にする
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache'); // キャッシュが開かれたことを確認
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                // キャッシュにレスポンスがあればそれを返し、なければネットワークからフェッチ
                return response || fetch(event.request);
            })
    );
});
