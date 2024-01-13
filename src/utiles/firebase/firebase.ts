// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQUeDE0BS35YI4pCC75tmHHqxFdE_qX_k",
  authDomain: "code-4all.firebaseapp.com",
  projectId: "code-4all",
  storageBucket: "code-4all.appspot.com",
  messagingSenderId: "607643500059",
  appId: "1:607643500059:web:f361e9a01bc3cce83ac2be",
  measurementId: "G-ZX45SJ6BNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()