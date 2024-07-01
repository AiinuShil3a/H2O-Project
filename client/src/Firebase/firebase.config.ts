import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider , 
  signInWithPopup
} from "firebase/auth";
import { type UserCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyABFcHWtPSxYI4ZHWmBRDhXVFUOYROJzDw",
  authDomain: "aeiou-dcea8.firebaseapp.com",
  projectId: "aeiou-dcea8",
  storageBucket: "aeiou-dcea8.appspot.com",
  messagingSenderId: "440571327089",
  appId: "1:440571327089:web:0a82b34e9b0e648908a1d0",
  measurementId: "G-3FYQ2V5BD1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const type = getAuth();

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber , type ,   GoogleAuthProvider , signInWithPopup };
export type { UserCredential };
