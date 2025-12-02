importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD8P6IzzXC9eXpOyJsJthV21s1bbL4kEKQ",
    authDomain: "classes-cfb71.firebaseapp.com",
    databaseURL: "https://classes-cfb71-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "classes-cfb71",
    storageBucket: "classes-cfb71.firebasestorage.app",
    messagingSenderId: "678474968676",
    appId: "1:678474968676:web:9644c9bc6380c857983971"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/img/logo.png', // Ensure this path is correct
        data: {
            url: self.location.origin // Open the website root
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window/tab open with the target URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === self.location.origin + '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, open a new window/tab
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
