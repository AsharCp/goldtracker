// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAd4Be8qX2tWRuClrkqm5USWutqNcbNb34",
  authDomain: "goldapp-b230a.firebaseapp.com",
  projectId: "goldapp-b230a",
  storageBucket: "goldapp-b230a.firebasestorage.app",
  messagingSenderId: "37773126229",
  appId: "1:37773126229:web:f50f4c618467d8ba0d42dc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
