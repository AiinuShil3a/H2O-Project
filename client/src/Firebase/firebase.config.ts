import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD56h2hgGd77nc4TbiYSn4f2yB6naqvp1Q",
  authDomain: "finaltesting-d434e.firebaseapp.com",
  projectId: "finaltesting-d434e",
  storageBucket: "finaltesting-d434e.appspot.com",
  messagingSenderId: "29211000858",
  appId: "1:29211000858:web:0c6bf0c2dd58aeaa8dd1a3",
  measurementId: "G-X4G9HREYF9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber };
