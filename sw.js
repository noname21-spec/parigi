var C="par-v4",T="par-tiles-v1",F=["./","icon-192.png","icon-512.png","apple-touch-icon.png","manifest.webmanifest"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F.map(function(u){return new Request(u,{cache:"reload"})}))}).catch(function(){}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C&&n!==T}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
if(e.request.method!=="GET")return;
var u=new URL(e.request.url),same=u.origin===location.origin;
if(/rapidapi\.com$|open-meteo\.com$|opendata\.paris\.fr$|opendatasoft\.com$/.test(u.hostname))return;
if(/tile\.openstreetmap\.org|cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.hostname)){
e.respondWith(caches.open(T).then(function(c){return c.match(e.request).then(function(m){var net=fetch(e.request).then(function(r){if(r&&(r.ok||r.type==="opaque"))c.put(e.request,r.clone());return r}).catch(function(){return m});return m||net})}));return}
if(!same)return;
var req=new Request(e.request,{cache:"no-store"});
e.respondWith(fetch(req).then(function(r){if(r.ok){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)}).catch(function(){})}return r}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(m){return m||caches.match("./")})}));
});
