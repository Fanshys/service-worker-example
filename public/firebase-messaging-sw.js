// async function subscribeChrome() {
//     if (!('serviceWorker' in navigator && 'Notification' in window)) return;

//     await loadFirebaseLibs();

//     const permission = await Notification.requestPermission();

//     if (permission !== 'granted') return;

//     const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js');
//     const token = await getFirebaseToken(registration);

//     if (!token) return;

//     return sendSubscriptionToServer(token, true);
// }

// async function getFirebaseToken(registration) {
//     let token = null;

//     try {
//         const firebase = window.firebase;

//         if (!firebase) return;

//         firebase.initializeApp(firebaseConfig);

//         const messaging = firebase.messaging();

//         token = await messaging.getToken({serviceWorkerRegistration: registration});
//     } catch (error) {
//         console.log(error);
//     }

//     return token;
// }

/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

function handleBackgroundMessage(payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.image,
        data: {
            url: payload.data.url
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
}

function handleClick(event) {
    event.notification.close();
    clients.openWindow(event.notification.data.url)
}

function handleInstall() {
    self.skipWaiting();
}

messaging.onBackgroundMessage(handleBackgroundMessage);

self.addEventListener('notificationclick', handleClick);
self.addEventListener('install', handleInstall);
