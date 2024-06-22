import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0hEZRkUc8Cp8eYzykqno8m3HZ354eml4",
  authDomain: "opop-8e793.firebaseapp.com",
  projectId: "opop-8e793",
  storageBucket: "opop-8e793.appspot.com",
  messagingSenderId: "34008444180",
  appId: "1:34008444180:web:c5c7cf7fae1001f462a601",
  measurementId: "G-ENJX03QZDG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber };
