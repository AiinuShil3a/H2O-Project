import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { type UserCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBhgQu1djZfiFYyojiegG0pY6ciylL3kk8",
  authDomain: "miniprojects-40ec8.firebaseapp.com",
  projectId: "miniprojects-40ec8",
  storageBucket: "miniprojects-40ec8.appspot.com",
  messagingSenderId: "847234083920",
  appId: "1:847234083920:web:7dd1be949ac96787a23555",
  measurementId: "G-ESS01TYET9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const type = getAuth();

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber , type };
export type { UserCredential };
