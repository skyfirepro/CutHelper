const CACHE_NAME = 'rollcalc-cache-v1';

// --- ОЧЕНЬ ВАЖНО: УКАЗЫВАЕМ ВСЕ ФАЙЛЫ И ИКОНКИ С ПРАВИЛЬНЫМИ ПУТЯМИ ---
const urlsToCache = [
    './', // Главная страница (для старта)
    './index.html',
    './manifest.json',

    // Иконки Android
    './android/android-launchericon-512-512.png',
    './android/android-launchericon-192-192.png',
    './android/android-launchericon-144-144.png',
    './android/android-launchericon-96-96.png',
    './android/android-launchericon-72-72.png',
    './android/android-launchericon-48-48.png',

    // Иконки iOS (могут быть не все нужны для PWA, но лучше закэшировать)
    './ios/16.png',
    './ios/20.png',
    './ios/29.png',
    './ios/32.png',
    './ios/40.png',
    './ios/50.png',
    './ios/57.png',
    './ios/58.png',
    './ios/60.png',
    './ios/64.png',
    './ios/72.png',
    './ios/76.png',
    './ios/80.png',
    './ios/87.png',
    './ios/100.png',
    './ios/114.png',
    './ios/120.png',
    './ios/128.png',
    './ios/144.png',
    './ios/152.png',
    './ios/167.png',
    './ios/180.png',
    './ios/192.png',
    './ios/256.png',
    './ios/512.png',
    './ios/1024.png',
];
// ----------------------------------------------------------------------

// 1. УСТАНОВКА (КЭШИРОВАНИЕ)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Открываю кэш и кэширую файлы');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. ФЕТЧ (ОБРАБОТКА ЗАПРОСОВ)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// 3. АКТИВАЦИЯ (ОЧИСТКА СТАРОГО КЭША)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});