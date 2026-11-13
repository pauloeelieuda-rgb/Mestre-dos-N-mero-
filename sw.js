const CACHE_NAME="mestre-numeros-v3";
const CORE=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./capa-jogo.jpg"];
self.addEventListener("install",event=>event.waitUntil((async()=>{const c=await caches.open(CACHE_NAME);await c.addAll(CORE);await self.skipWaiting()})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith("mestre-numeros-")&&k!==CACHE_NAME).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith((async()=>{const cached=await caches.match(event.request);if(cached)return cached;try{const response=await fetch(event.request);if(response.ok&&new URL(event.request.url).origin===self.location.origin){const c=await caches.open(CACHE_NAME);c.put(event.request,response.clone())}return response}catch(e){return await caches.match("./index.html")}})())});
