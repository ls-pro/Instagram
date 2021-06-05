import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA-wntD6x62_Gq9FBhvMugSY1QWFnVVeRc",
    authDomain: "instagram-ls-41a43.firebaseapp.com",
    projectId: "instagram-ls-41a43",
    storageBucket: "instagram-ls-41a43.appspot.com",
    messagingSenderId: "178714738827",
    appId: "1:178714738827:web:5cf853c3bd7a59fe9d948e",
    measurementId: "G-DJ93KF5HLF"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};