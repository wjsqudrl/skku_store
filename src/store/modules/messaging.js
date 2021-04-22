import { initializeApp } from 'firebase';
import {dbUpdate} from '../../firebase.js'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { store } from '../store.js'

// // export var token = ''
// // firebase.initializeApp(firebaseConfig);
// // var user = firebase.auth().currentUser;
// export const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null
// // alert("로그인")

// if (firebase.messaging.isSupported()){
//     messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_PUSH_KEY)
// }

// if (firebase.messaging.isSupported()) {
//     // // TODO: Send token to server for send notification
//     // Get Instance ID token. Initially this makes a network call, once retrieved
//     // subsequent calls to getToken will return from cache.
//     messaging.getToken().then((currentToken) => {
//         if (currentToken) {
//             console.log(currentToken)
//             // context.commit('setToken')
//             store.commit('setToken', currentToken)
//             var uid = firebase.auth().currentUser.uid
//             console.log(uid)
//             console.log("token Update")
//             var input = {
//                 token: firebase.firestore.FieldValue.arrayUnion(currentToken),
//             }
//             dbUpdate('userProfiles', uid, input)

//         } else {
//             // Show permission request.
//             console.log('No Instance ID token available. Request permission to generate one.');
//             Notification.requestPermission()
//                 .then((permission) => {
//                     console.log('permission ', permission)
//                     if (permission !== 'granted') {
//                         alert('브라우저의 알림을 허용해주세요')

//                     }
//                 })
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         Notification.requestPermission()
//             .then((permission) => {
//                 console.log('permission ', permission)
//                 if (permission !== 'granted') {
//                     alert('브라우저의 알림을 허용해주세요')

//                 }
//             })

//     });
//     // // // Handle received push notification at foreground
//     messaging.onMessage(payload => {
//         console.log("asdasdasd");
//         // alert("foreground")
//         const title = payload.notification.title;
//         const options = {
//             body: payload.notification.body,
//             icon: '/firebase-logo.png',
//         };
//         const notification = new Notification(title, options);
//         return notification;
//     })
// }
