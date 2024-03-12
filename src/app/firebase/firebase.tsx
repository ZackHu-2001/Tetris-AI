// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWqDed2uOcjlubuPLO5W-ktoWf9fwG2f8",
  authDomain: "tetris-group6.firebaseapp.com",
  projectId: "tetris-group6",
  storageBucket: "tetris-group6.appspot.com",
  messagingSenderId: "1039101765147",
  appId: "1:1039101765147:web:a963ca09a57bec98927abe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;