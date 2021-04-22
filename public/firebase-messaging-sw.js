// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBnvdOkMn3aPczxUA208xcUydPKsFWi4cc",
    authDomain: "skku-graduation-project-9dd6a.firebaseapp.com",
    databaseURL: "https://skku-graduation-project-9dd6a.firebaseio.com",
    projectId: "skku-graduation-project-9dd6a",
    storageBucket: "skku-graduation-project-9dd6a.appspot.com",
    messagingSenderId: "180647858206",
    appId: "1:180647858206:web:4ca2f43dbabf03cb9f1e0f"
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// 백그라운드 상태에서 받은 알림 처리
messaging.setBackgroundMessageHandler((payload) => {
    console.log('background ', payload);
    // Customize notification here
    // alert("background")
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    }

    return self.registration.showNotification(title, options);
});
