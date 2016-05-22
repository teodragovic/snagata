/* eslint-disable */
(function() {
    'use strict';

    var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    if ('serviceWorker' in navigator &&
        (window.location.protocol === 'https:' || isLocalhost)) {
        navigator.serviceWorker.register('/snagata/sw.js')
            .then(function(registration) {

                if (typeof registration.update === 'function') {
                    registration.update();
                }
                registration.onupdatefound = function() {
                    if (navigator.serviceWorker.controller) {
                        var installingWorker = registration.installing;

                        installingWorker.onstatechange = function() {
                            switch (installingWorker.state) {
                                case 'installed':
                                    console.log('refresh for new content');
                                    break;

                                case 'redundant':
                                    throw new Error('The installing ' +
                                        'service worker became redundant.');
                            }
                        };
                    }
                };
            })
            .catch(function(e) {
                console.error('Error during service worker registration:', e);
            });
    }

})();
