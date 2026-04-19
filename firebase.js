import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 CONFIG DO SEU FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDPWszT1ekCHGhi_WG8RhzZe9LptBntomA",
  authDomain: "rotaexpertlite.firebaseapp.com",
  projectId: "rotaexpertlite",
  storageBucket: "rotaexpertlite.firebasestorage.app",
  messagingSenderId: "1011801483543",
  appId: "1:1011801483543:web:79a37aef4cf6851b4b6f52",
  measurementId: "G-NQ8ZFHZEEY"
};

// Inicializa app
const app = initializeApp(firebaseConfig);

// 🔐 AUTH (login)
export const auth = getAuth(app);

// 🗄️ DATABASE (Firestore)
export const db = getFirestore(app);