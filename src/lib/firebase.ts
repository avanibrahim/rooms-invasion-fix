import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
apiKey: 'AIzaSyBhpRvm16zpVnNIwuBV7axtu8tjOGb2DIw',
authDomain: 'roomsinvasion-86239.firebaseapp.com',
projectId: 'roomsinvasion-86239',
storageBucket: 'roomsinvasion-86239.appspot.com',
messagingSenderId: '852229992862',
appId: '1:852229992862:web:d5ed960aa28d85f82b268f',
};

export const app = initializeApp(firebaseConfig);

// Stabil untuk Safari/172+ (hindari 400 listen channel)
export const db = initializeFirestore(app, {
experimentalAutoDetectLongPolling: true,
// Jika masih error jaringan, aktifkan baris di bawah:
// experimentalForceLongPolling: true,
});

export const storage = getStorage(app);
export const auth = getAuth(app);