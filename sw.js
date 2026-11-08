var N='rifki-v3';
var F=['./','index.html','manifest.json','data.json'];
function key(u){var x=new URL(u);x.search='';return x.href}
self.addEventListener('install',function(e){
e.waitUntil(caches.open(N).then(function(c){
return Promise.all(F.map(function(u){
return fetch(new URL(u,self.registration.scope).href,{cache:'reload'}).then(function(r){return c.put(new URL(u,self.registration.scope).href,r)}).catch(function(){})
}))}));
self.skipWaiting()});
self.addEventListener('activate',function(e){
e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(x){return x!=N}).map(function(x){return caches.delete(x)}))}));
self.clients.claim()});
self.addEventListener('fetch',function(e){
if(e.request.method!='GET')return;
var u=new URL(e.request.url);
if(u.origin!=location.origin)return;
var k=key(e.request.url);
e.respondWith(fetch(k,{cache:'reload'}).then(function(r){
if(r.ok){var c=r.clone();caches.open(N).then(function(x){x.put(k,c)})}
return r
}).catch(function(){
return caches.match(k).then(function(m){return m||caches.match(self.registration.scope)})
}))});
