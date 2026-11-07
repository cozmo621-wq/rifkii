var N='rifki-v1',F=['./','index.html','manifest.json','data.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(N).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(x){return x!=N}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){
if(e.request.method!='GET')return;
if(new URL(e.request.url).origin!=location.origin)return;
e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(N).then(function(x){x.put(e.request,c)});return r}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(m){return m||caches.match('index.html')})}))});
