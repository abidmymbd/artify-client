// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu5UWCA9UnBC9XUr3OqAegcvN24Vt_Fm4",
  authDomain: "artify-9a7ea.firebaseapp.com",
  projectId: "artify-9a7ea",
  storageBucket: "artify-9a7ea.firebasestorage.app",
  messagingSenderId: "70359666031",
  appId: "1:70359666031:web:bdd3293a92ab3f0123ec9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)