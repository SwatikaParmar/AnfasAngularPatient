// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
   apiKey: "AIzaSyDAv0cpNLxGNzD1viqjAsWe0ktoidMuego",
  authDomain: "anfas-7a927.firebaseapp.com",
  databaseURL: "https://anfas-7a927-default-rtdb.firebaseio.com",
  projectId: "anfas-7a927",
  storageBucket: "anfas-7a927.firebasestorage.app",
  messagingSenderId: "1078172885688",
  appId: "1:1078172885688:web:bd0848b228c9357bee8a4d",
  measurementId: "G-B3D35H5S50"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();