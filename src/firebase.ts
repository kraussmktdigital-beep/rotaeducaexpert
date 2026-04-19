import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// 🔥 SUA CONFIG REAL
const firebaseConfig = {
  apiKey: "AIzaSyDPWszT1ekCHGhi_WG8RhzZe9LptBntomA",
  authDomain: "rotaexpertlite.firebaseapp.com",
  projectId: "rotaexpertlite",
  storageBucket: "rotaexpertlite.firebasestorage.app",
  messagingSenderId: "1011801483543",
  appId: "1:1011801483543:web:79a37aef4cf6851b4b6f52",
  measurementId: "G-NQ8ZFHZEEY"
};

// inicia Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// LOGIN GOOGLE
export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// LOGOUT
export const logout = () => {
  return signOut(auth);
};