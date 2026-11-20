// LaserOS service worker: keeps the app and everything it needs on the device, so it opens offline.
const CACHE = "laseros-20261120-144629";
const CORE = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icons/apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/favicon-64.png",
  "./vendor/mp4-muxer.js", "./vendor/UTIF.js", "./vendor/pako.min.js",
  ...["latin", "latin-ext", "greek"].flatMap(s => [400, 500, 600, 700].map(w => `./fonts/ibm-plex-sans-${s}-${w}-normal.woff2`)),
  ...["latin", "latin-ext"].flatMap(s => [400, 500, 600].map(w => `./fonts/ibm-plex-mono-${s}-${w}-normal.woff2`)),
];
// vendor/h264-mp4-encoder.web.js (1.7 MB) is only needed where the browser can't encode MP4 itself; it is cached the first time it is used.

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("laseros-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // The page itself: try the network first so updates arrive, fall back to the saved copy offline.
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return res; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // Everything else: saved copy first, network if missing (and keep it for next time).
  event.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
