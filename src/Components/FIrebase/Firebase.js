// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaOI5NUBtiPQJdqWtyBxSCHmccJyWLZjU",
  authDomain: "email-password-auth-cd6d5.firebaseapp.com",
  projectId: "email-password-auth-cd6d5",
  storageBucket: "email-password-auth-cd6d5.firebasestorage.app",
  messagingSenderId: "406477061527",
  appId: "1:406477061527:web:6c8952d55c106738f1d8d2",
  measurementId: "G-DZGXHZFD5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;