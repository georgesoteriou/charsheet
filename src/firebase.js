import firebase from 'firebase/app'
import { enableIndexedDbPersistence } from "firebase/firestore"; 
import 'firebase/firestore'
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyBT6JcUP98XVxINUjvtPU8Y6s7hid1X_zQ",
    authDomain: "charsheet-9cbe5.firebaseapp.com",
    projectId: "charsheet-9cbe5",
    storageBucket: "charsheet-9cbe5.appspot.com",
    messagingSenderId: "713857545006",
    appId: "1:713857545006:web:2280f3e3eaade83d2440bf",
    measurementId: "G-C7LK58RYGK"
  };

const app = firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

firebase.firestore().enablePersistence()
.catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log("Failed to setup firestore Persistence:", err)
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
    } else if (err.code == 'unimplemented') {
      console.log("Failed to setup firestore Persistence because its not implemented in your browser:", err)
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
    }
});

// Get a Firestore instance
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore(app);
export const auth = firebase.auth(app);
