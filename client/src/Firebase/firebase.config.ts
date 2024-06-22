import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAb2ycSUgw2wfd3gx1aXOiC_I-nP2f7D50",
  authDomain: "testing-a2648.firebaseapp.com",
  projectId: "testing-a2648",
  storageBucket: "testing-a2648.appspot.com",
  messagingSenderId: "514042362319",
  appId: "1:514042362319:web:7a34fb31686bc8176cbaba",
  measurementId: "G-8LZ5Z3CGQV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber };
