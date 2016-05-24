/* eslint-disable */
'use strict';

(function() {

    const staticCacheName = 'static';
    const version = 'v14::';

    const urlsToCache = [
        '/snagata/',
        '/snagata/css/main.css?v=4',
        '/snagata/scripts/main.js?v=1'
    ];

    const imgPlaceholder = '<svg width="400" height="300" role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>';

    function updateStaticCache() {
        return caches.open(version + staticCacheName)
            .then(cache => cache.addAll(urlsToCache));
    };

    function putToCache(request, response) {
        if (response.ok) {
            var copy = response.clone();
            caches.open(version + staticCacheName)
                .then(cache => {
                    cache.put(request, copy);
                });
        }
        return response;
    };

    function doesRequestAcceptHtml(request) {
        return request.headers.get('Accept')
            .split(',')
            .some(type => type === 'text/html');
    };

    function unableToResolve(request) {
        const url = new URL(request.url);
        const accepts = request.headers.get('Accept');
        if (accepts.indexOf('image') !== -1) {
            return new Response(imgPlaceholder, { headers: { 'Content-Type': 'image/svg+xml' } });
        } else if (doesRequestAcceptHtml(request)) {
            return offlineResponse();
        }
        return undefined;
    };

    function offlineResponse() {
        return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/html' })
        });
    };

    self.addEventListener('install', function(event) {
        event.waitUntil(
            updateStaticCache()
            .then(() => self.skipWaiting())
        )
    });


    self.addEventListener('activate', (event) => {
        function onActivate() {
            return caches.keys()
                .then(cacheKeys => {
                    var oldCacheKeys = cacheKeys.filter(key => key.indexOf(version) !== 0);
                    var deletePromises = oldCacheKeys.map(oldKey => caches.delete(oldKey));
                    return Promise.all(deletePromises);
                });
        }

        event.waitUntil(
            onActivate()
            .then(() => self.clients.claim())
        );
    });



    self.addEventListener('fetch', (event) => {

        let request = event.request;

        if (request.method !== 'GET') return;

        if (doesRequestAcceptHtml(request)) {
            // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
            // and https://gist.github.com/jakearchibald/aff93cad208bd56a02ea70f9f0d01c99
            if (request.mode != 'navigate') {
                request = new Request(request.url, {
                    method: 'GET',
                    headers: request.headers,
                    mode: request.mode,
                    credentials: request.credentials,
                    redirect: request.redirect
                });
            }

            event.respondWith(
                fetch(request)
                .then((response) => {
                    return putToCache(request, response);
                })
                .catch(() => {
                    return caches.match(request)
                        .then((response) => {
                            return response || offlineResponse();
                        })
                })
            );
            return;
        }

        event.respondWith(
            caches.match(request)
            .then((response) => {
                const copy = request.clone();
                return response || fetch(copy)
                    .then((response) => {
                        return putToCache(request, response);
                    })
                    .catch(unableToResolve(request));
            })
        );

    });

})();
