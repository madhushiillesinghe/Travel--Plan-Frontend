// Firebase initialization code (ensure it's at the top level in your app)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-whJr7TvFsLKA8KJVV-amQ5kWU117Xq8",
    authDomain: "travel-plan-2ddaa.firebaseapp.com",
    projectId: "travel-plan-2ddaa",
    storageBucket: "travel-plan-2ddaa.firebasestorage.app",
    messagingSenderId: "1078903376590",
    appId: "1:1078903376590:web:ab42b790645669bdd5de9f",
    measurementId: "G-XT0871H0C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ FIXED
export const db = getFirestore(app);
