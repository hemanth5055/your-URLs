import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbxM1hAHxMRoHfw2Sf6EkjNCfn3MXgtis",
  authDomain: "yoururls.firebaseapp.com",
  projectId: "yoururls",
  storageBucket: "yoururls.firebasestorage.app",
  messagingSenderId: "563437874357",
  appId: "1:563437874357:web:670c065c58fc8ee6bca2fc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);