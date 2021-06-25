import firebase from 'firebase/app'
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

// Get a Firestore instance
const app = firebase.initializeApp(firebaseConfig);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore(app);
export const auth = firebase.auth(app);
