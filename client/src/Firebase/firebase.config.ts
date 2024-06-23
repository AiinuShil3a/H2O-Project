import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { type UserCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUPCUf-x-jOcIhBFO3faNGIN-2Zhcyd80",
  authDomain: "testting-15514.firebaseapp.com",
  projectId: "testting-15514",
  storageBucket: "testting-15514.appspot.com",
  messagingSenderId: "507284016535",
  appId: "1:507284016535:web:ef0e70071fb310191388d2",
  measurementId: "G-C988XLWDTX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const type = getAuth();

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber , type };
export type { UserCredential };
