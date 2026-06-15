import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr7sPBEzrL0PLNHoTVvbJnreS7FqZZz_k",
  authDomain: "schneider-lang-projekt3.firebaseapp.com",
  projectId: "schneider-lang-projekt3",
  storageBucket: "schneider-lang-projekt3.firebasestorage.app",
  messagingSenderId: "410889956049",
  appId: "1:410889956049:web:05bc2ac9ec54f75fd333f0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, 'lsprojekt3');
