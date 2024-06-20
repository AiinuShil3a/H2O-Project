import { initializeApp } from 'firebase/app';
import { getAuth , RecaptchaVerifier , signInWithPhoneNumber  } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB9IQsHMyQ53B8qc2tGFujOOLceJDQbfIQ",
  authDomain: "h2o-project-5e5c7.firebaseapp.com",
  projectId: "h2o-project-5e5c7",
  storageBucket: "h2o-project-5e5c7.appspot.com",
  messagingSenderId: "646416130066",
  appId: "1:646416130066:web:578e5cbeb17a62acae38cb",
  measurementId: "G-ZHL9VEKTWH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app , auth , RecaptchaVerifier , signInWithPhoneNumber };