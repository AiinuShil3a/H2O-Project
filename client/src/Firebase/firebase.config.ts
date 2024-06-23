import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { type UserCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCoD4PbErtkXG3PTWxceNLhmblCxJUWS4Q",
  authDomain: "testing-2646a.firebaseapp.com",
  projectId: "testing-2646a",
  storageBucket: "testing-2646a.appspot.com",
  messagingSenderId: "659342724256",
  appId: "1:659342724256:web:99478583d5d27ddf5f8dc5",
  measurementId: "G-BKKNPV4XZC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const type = getAuth();

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber , type };
export type { UserCredential };
