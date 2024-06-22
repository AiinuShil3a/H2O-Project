import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1b6CIMopv6xmYpmzoVMJSqQad1g5DBmE",
  authDomain: "finaltest-cafe7.firebaseapp.com",
  projectId: "finaltest-cafe7",
  storageBucket: "finaltest-cafe7.appspot.com",
  messagingSenderId: "761135774546",
  appId: "1:761135774546:web:b80468fe7060676af2188b",
  measurementId: "G-9QG50L489F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber };
