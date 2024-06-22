import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgI79_lMrLSkORkARFp9uPNNVkpkxEiOU",
  authDomain: "testv2-b7531.firebaseapp.com",
  projectId: "testv2-b7531",
  storageBucket: "testv2-b7531.appspot.com",
  messagingSenderId: "700731551124",
  appId: "1:700731551124:web:48ad2e7ffb046c0765f381",
  measurementId: "G-D30WDWTCM8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber };
