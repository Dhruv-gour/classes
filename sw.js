// Service Worker for offline support
const CACHE_NAME = 'chaturvedi-classes-v2';
const OFFLINE_URL = './offline.html';

// Install event - cache offline.html immediately
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Fetch and cache offline.html
            return fetch(OFFLINE_URL)
                .then((response) => {
                    if (response.ok) {
                        return cache.put(OFFLINE_URL, response);
                    }
                    throw new Error('Failed to fetch offline.html');
                })
                .catch((error) => {
                    console.log('Failed to fetch offline.html, creating fallback:', error);
                    // Create offline.html content inline
                    const offlineHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>No Internet Connection - Chaturvedi Classes</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f9fafb;color:#111827;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem}
        .container{width:100%;max-width:28rem;text-align:center;animation:fadeInUp 0.5s ease-out}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(1rem)}to{opacity:1;transform:translateY(0)}}
        .logo{width:5rem;height:5rem;margin:0 auto 2rem;display:flex;align-items:center;justify-content:center;overflow:hidden}
        .icon-circle{width:6rem;height:6rem;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem}
        .icon-circle svg{width:3rem;height:3rem;color:#b91c1c}
        h1{font-size:1.875rem;font-weight:700;color:#111827;margin-bottom:1rem}
        @media(min-width:768px){h1{font-size:2.25rem}}
        .description{color:#4b5563;font-size:1.125rem;margin-bottom:2rem}
        .status-card{background:white;border-radius:1rem;border:1px solid #e5e7eb;padding:1.5rem;margin-bottom:1.5rem}
        .status-row{display:flex;align-items:center;justify-content:center;gap:0.75rem;margin-bottom:1rem}
        .status-text{font-size:0.875rem;font-weight:500;color:#374151}
        .status-info{font-size:0.75rem;color:#6b7280}
        .retry-count{font-weight:600;color:#b91c1c}
        .indicator-dot{width:0.5rem;height:0.5rem;background:#ef4444;border-radius:50%;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .spinner{width:1.25rem;height:1.25rem;border:2px solid #fbbf24;border-top-color:transparent;border-radius:50%;animation:spin 2s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        .retry-button{width:100%;background:#b91c1c;color:white;padding:1rem;border-radius:0.75rem;font-weight:700;font-size:1.125rem;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:0.5rem;transition:all 0.3s;box-shadow:0 10px 15px -3px rgba(185,28,28,0.1)}
        .retry-button:hover:not(:disabled){background:#991b1b;box-shadow:0 20px 25px -5px rgba(185,28,28,0.1)}
        .retry-button:disabled{opacity:0.5;cursor:not-allowed}
        .retry-button svg{width:1.25rem;height:1.25rem}
        .footer{margin-top:2rem;font-size:0.75rem;color:#9ca3af}
    </style>
</head>
<body>
    <div class="container">
        <div class="logo"><img src="img/logo.png" alt="Logo" onerror="this.style.display='none'"></div>
        <div class="icon-circle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" x2="23" y1="1" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg></div>
        <h1>No Internet Connection</h1>
        <p class="description">It looks like you're offline. Please check your internet connection and try again.</p>
        <div class="status-card">
            <div class="status-row"><div class="indicator-dot"></div><span class="status-text">Auto-retrying...</span></div>
            <p class="status-info">Retry attempts: <span class="retry-count" id="retryCount">0</span></p>
        </div>
        <button class="retry-button" id="retryButton" onclick="location.reload()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            <span>Retry Now</span>
        </button>
        <p class="footer">Chaturvedi Classes - Excellence in Education</p>
    </div>
    <script>
        let retryCount=0;let retryInterval=null;const lastUrl=localStorage.getItem('lastVisitedUrl')||'index.html';
        function checkInternet(){if(!navigator.onLine)return false;return fetch('https://www.google.com/favicon.ico?'+Date.now(),{method:'HEAD',mode:'no-cors',cache:'no-cache'}).then(()=>true).catch(()=>false)}
        async function handleRetry(){retryCount++;document.getElementById('retryCount').textContent=retryCount;const hasInternet=await checkInternet();if(hasInternet)window.location.href=lastUrl}
        function startAutoRetry(){checkInternet().then(hasInternet=>{if(hasInternet)window.location.href=lastUrl});retryInterval=setInterval(()=>{checkInternet().then(hasInternet=>{if(hasInternet){clearInterval(retryInterval);window.location.href=lastUrl}else{retryCount++;document.getElementById('retryCount').textContent=retryCount}})},3000);window.addEventListener('online',()=>{clearInterval(retryInterval);setTimeout(()=>{checkInternet().then(hasInternet=>{if(hasInternet)window.location.href=lastUrl;else startAutoRetry()})},500)})}
        document.getElementById('retryButton').addEventListener('click',handleRetry);startAutoRetry();
    </script>
</body>
</html>`;
                    return cache.put(OFFLINE_URL, new Response(offlineHTML, {
                        headers: { 'Content-Type': 'text/html' }
                    }));
                });
        })
    );
    // Force the waiting service worker to become the active service worker immediately
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

// Listen for skip waiting message
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Fetch event - intercept network requests
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url, self.location.origin);
    
    // Handle navigation requests (page loads) - this is critical for mobile
    if (request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
        // Create timeout for fetch (for mobile browsers)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        event.respondWith(
            fetch(request, { 
                cache: 'no-store',
                signal: controller.signal
            })
                .then((response) => {
                    clearTimeout(timeoutId);
                    // If we get a valid response, return it
                    if (response && response.status === 200) {
                        return response;
                    }
                    // If response is not OK, try cache
                    throw new Error('Response not OK');
                })
                .catch((error) => {
                    clearTimeout(timeoutId);
                    // Network failed or timeout - serve offline.html
                    console.log('Network failed, serving offline page:', error);
                    
                    // Check if we're already on offline.html
                    const isOfflinePage = url.pathname.endsWith('offline.html') || url.pathname.endsWith('/offline.html');
                    
                    if (isOfflinePage) {
                        // If offline.html itself fails, return from cache
                        return caches.match(OFFLINE_URL).then((cachedResponse) => {
                            return cachedResponse || new Response('Offline', { status: 200, headers: { 'Content-Type': 'text/html' } });
                        });
                    } else {
                        // For any other page when offline, redirect to offline.html
                        return caches.match(OFFLINE_URL).then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            // If offline.html not in cache, create a basic one
                            return new Response(
                                '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Offline</title><style>body{font-family:Arial;text-align:center;padding:50px;background:#f9fafb;color:#111827}h1{color:#b91c1c}</style></head><body><h1>No Internet Connection</h1><p>Please check your internet connection and try again.</p><button onclick="location.reload()">Retry</button></body></html>',
                                { 
                                    status: 200,
                                    headers: { 'Content-Type': 'text/html' } 
                                }
                            );
                        });
                    }
                })
        );
    } else {
        // For non-navigation requests (images, scripts, etc.), try network first, then cache
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Only cache successful responses
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Try to get from cache
                    return caches.match(request).then((cachedResponse) => {
                        return cachedResponse || new Response('Not available offline', { status: 503 });
                    });
                })
        );
    }
});

