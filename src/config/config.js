import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBFEgLYiJbqMLIz0IReer8kv9ylfYfxhbs",
    authDomain: "school-system-fda16.firebaseapp.com",
    projectId: "school-system-fda16",
    storageBucket: "school-system-fda16.appspot.com",
    messagingSenderId: "317087459363",
    appId: "1:317087459363:web:794c424ce2e794754de996",
    measurementId: "G-3P8W9CWF03"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
