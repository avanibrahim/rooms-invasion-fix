// src/lib/firebase.ts
import { initializeApp, getApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBhpRvm16zpVnNIwuBV7axtu8tjOGb2DIw",
  authDomain: "roomsinvasion-86239.firebaseapp.com",
  projectId: "roomsinvasion-86239",
  storageBucket: "roomsinvasion-86239.appspot.com",
  messagingSenderId: "852229992862",
  appId: "1:852229992862:web:d5ed960aa28d85f82b268f",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// ---- App Check (opsional, aktifkan hanya jika Firestore/AppCheck di Console = Enforced)
async function maybeInitAppCheck() {
  if (typeof window === 'undefined') return;
  const siteKey = import.meta.env.VITE_FIREBASE_RECAPTCHA_KEY as string | undefined;
  if (!siteKey) return; // skip kalau tidak pakai App Check
  if (import.meta.env.DEV) {
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true; // HANYA DEV
  }
  const { initializeAppCheck, ReCaptchaV3Provider } = await import('firebase/app-check');
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });
}

// ---- Logging & verifikasi project
if (typeof window !== 'undefined') {
  console.log('Firebase projectId:', getApp().options.projectId);
  setLogLevel('debug'); // tampilkan detail error Firestore di console
  // Inisialisasi App Check hanya jika ada SITE KEY di env
  // Tambah di .env.local: VITE_FIREBASE_RECAPTCHA_KEY=xxxx (kalau App Check enforced)
  // lalu restart dev server
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  maybeInitAppCheck();
}

/** Pastikan user login sebelum akses data. 
 *  - Jika rules mengizinkan anonymous → ini cukup.
 *  - Jika tidak, ganti signInAnonymously dengan flow loginmu (Google/email).
 */
export function ensureAuth(): Promise<string | null> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const t = await user.getIdToken(true);
        console.log('Auth OK uid:', user.uid, 'token.len:', t?.length);
        resolve(user.uid);
      } else {
        signInAnonymously(auth)
          .then((cred) => resolve(cred.user?.uid ?? null))
          .catch((err) => {
            console.error('Anon sign-in gagal:', err?.code, err?.message);
            resolve(null);
          });
      }
    });
  });
}

/** Diagnostik cepat: bedakan masalah rules vs query. */
export async function startDiagnostics() {
  const uid = await ensureAuth();
  console.log('Diagnostics start; uid =', uid);

  // 1) GET satu dokumen spesifik (ganti ID nyata yang ADA)
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const ref = doc(db, 'products', 'SOME_EXISTING_DOC_ID'); // TODO: ganti
    const snap = await getDoc(ref);
    console.log('[getDoc] exists:', snap.exists());
  } catch (e: any) {
    console.error('[getDoc] error:', e?.code, e?.message);
  }

  // 2) QUERY yang cocok pola "konten publik terbit"
  try {
    const { collection, query, where, limit, getDocs } = await import('firebase/firestore');
    const q = query(
      collection(db, 'products'),
      where('published', '==', true),
      limit(5)
    );
    const ss = await getDocs(q);
    console.log('[query published==true] count:', ss.size);
  } catch (e: any) {
    console.error('[query] error:', e?.code, e?.message);
  }
}
