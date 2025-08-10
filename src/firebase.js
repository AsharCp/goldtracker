// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ This line is required

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6XRtCvy4mEPbl6KS4zf20wO-M1YfO_q4",
  authDomain: "cafebook-7e475.firebaseapp.com",
  projectId: "cafebook-7e475",
  storageBucket: "cafebook-7e475.firebasestorage.app",
  messagingSenderId: "243828881257",
  appId: "1:243828881257:web:1cc4ad0ac7ea8deb486ff8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);