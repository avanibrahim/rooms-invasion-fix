// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
 
const firebaseConfig = {
  apiKey: "AIzaSyBhpRvm16zpVnNIwuBV7axtu8tjOGb2DIw",
  authDomain: "roomsinvasion-86239.firebaseapp.com",
  projectId: "roomsinvasion-86239",
  storageBucket: "roomsinvasion-86239.firebasestorage.app",
  messagingSenderId: "852229992862",
  appId: "1:852229992862:web:d5ed960aa28d85f82b268f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
