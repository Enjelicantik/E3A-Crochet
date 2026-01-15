import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBeGUqnVwjtIQ5hOrPGrCiwqpF4C-Z5VYs",
    authDomain: "e3a-crochet-3c11b.firebaseapp.com",
    projectId: "e3a-crochet-3c11b",
    storageBucket: "e3a-crochet-3c11b.firebasestorage.app",
    messagingSenderId: "985582374691",
    appId: "1:985582374691:web:35132163f56d7de9594696"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const realtimeDB = getDatabase(app);
export const db = getFirestore(app);