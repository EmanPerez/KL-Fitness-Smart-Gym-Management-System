// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDoIQuYvYSwuNgBAaetoXhNZyf6MHDGok",
  authDomain: "kl-fitnessgmsauth.firebaseapp.com",
  projectId: "kl-fitnessgmsauth",
  storageBucket: "kl-fitnessgmsauth.firebasestorage.app",
  messagingSenderId: "577758589921",
  appId: "1:577758589921:web:01bc95ddfa4b3a7aab58a0",
  measurementId: "G-7PWF71ZFMT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);