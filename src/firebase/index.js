// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaxQLbFJtGLG5kY6A7OIVbfVdsi7sV2Vc",
  authDomain: "neeli-bd015.firebaseapp.com",
  projectId: "neeli-bd015",
  storageBucket: "neeli-bd015.firebasestorage.app",
  messagingSenderId: "793849375428",
  appId: "1:793849375428:web:0f0bb54c38e5f871f1b791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };