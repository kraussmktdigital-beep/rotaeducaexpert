import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPWszT1ekCHGhi_WG8RhzZe9LptBntomA",
  authDomain: "rotaexpertlite.firebaseapp.com",
  projectId: "rotaexpertlite",
  storageBucket: "rotaexpertlite.firebasestorage.app",
  messagingSenderId: "1011801483543",
  appId: "1:1011801483543:web:79a37aef4cf6851b4b6f52",
  measurementId: "G-NQ8ZFHZEEY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);

export const logout = () => signOut(auth);