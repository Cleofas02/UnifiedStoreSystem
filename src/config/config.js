import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBuaI6KCQ613f24k3DKx4f42ncRGqaWZQQ",
    authDomain: "unifiedstoresystem-6e62e.firebaseapp.com",
    databaseURL: "https://unifiedstoresystem-6e62e-default-rtdb.firebaseio.com",
    projectId: "unifiedstoresystem-6e62e",
    storageBucket: "unifiedstoresystem-6e62e.appspot.com",
    messagingSenderId: "1019865364473",
    appId: "1:1019865364473:web:4f64f96b1b0f710c216f28",
    measurementId: "G-RGJ3YPLYG6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
