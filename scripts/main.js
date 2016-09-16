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
                                    console.log('Refresh for new content.');
                                    break;
                                case 'redundant':
                                    throw new Error('The installing service worker became redundant.');
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

(function(t){var e=t._PageAccelerator=t._PageAccelerator||{};e.ajax={get:function(e){return new t.Promise(function(t,r){var a=new XMLHttpRequest;a.open("GET",e,true);a.onload=function(){if(a.status>=200&&a.status<400){t(a.response);return}r(a.response)};a.onerror=function(){r(Error("Network Error"))};a.send()})}}})(window);(function(t,e){var r=t._PageAccelerator=t._PageAccelerator||{};r.PageAccelerator=function(){this.url=e.location.href;this.callback=function(){}};r.PageAccelerator.prototype={_updateObject:function(t,e){var r=e.attributes;for(var a=0,n=r.length;a<n;a++){t.attrs[r[a].name]=r[a].value}return t},_updateHistory:function(e,r){var a=this._updateObject({head:e.innerHTML.trim(),content:r.innerHTML.trim(),attrs:{}},r);t.history.pushState(a,"",this.url);t.addEventListener("popstate",this._updateBody.bind(this),false)},_DOMParser:function(t){var e=new DOMParser;return e.parseFromString(t,"text/html")},_updateBodyAttributes:function(t){Object.keys(t).forEach(function(r){var a=t[r];e.body.attr(r,a)})},_updateBody:function(r){var a=r.state;this._updateBodyAttributes(a.attrs);e.body.innerHTML=a.content;var n=this._DOMParser(a.head);e.title=n.head.querySelector("title").innerText;this.url=t.location.href;this.start();this.callback()},_loadStyles:function(e,a){var n=[].map.call(e.querySelectorAll('link[rel="stylesheet"]'),function(t){return r.ajax.get(t.href)});t.Promise.all(n).then(a.bind(this))},_update:function(r){var a=this._DOMParser(r);var n=a.head;this._loadStyles(n,function(){var r=a.body;e.body=r;e.head=n;e.title=n.querySelector("title").innerText;this._updateHistory(n,r);this.callback();t.scrollTo(0,0);this.start()}.bind(this))},_onClick:function(t){this.url=t.href;r.ajax.get(this.url).then(this._update.bind(this)).catch(this._update.bind(this))},_replaceHistory:function(){var r=e.body;var a=this._updateObject({head:e.head.innerHTML.trim(),content:r.innerHTML.trim(),attrs:{}},r);t.history.replaceState(a,"",this.url)},start:function(t){this.callback=t||this.callback;var r=this;var a=e.querySelectorAll('a:not([data-pageAccelerator="false"])');[].forEach.call(a,function(t){if(t.hostname!==window.location.hostname||t.protocol!==window.location.protocol){return}t.addEventListener("click",function(t){t.preventDefault();r._onClick.call(r,this)},false)});this._replaceHistory()}};t.pageAccelerator=function(t){(new r.PageAccelerator).start(t)}})(window,document);

pageAccelerator();
