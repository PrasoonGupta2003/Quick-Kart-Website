import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginquickkart.firebaseapp.com",
  projectId: "loginquickkart",
  storageBucket: "loginquickkart.firebasestorage.app",
  messagingSenderId: "566557514099",
  appId: "1:566557514099:web:5907aa54409f4de3788d06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const provider=new GoogleAuthProvider();

export {auth, provider};
