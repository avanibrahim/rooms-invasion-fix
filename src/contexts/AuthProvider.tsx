import React, { createContext, useEffect, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged, signOut, getIdToken, type User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// ---- Types ----
type AuthContextValue = {
  user: User | null;
  handleLogout: () => Promise<void>;
};

// ---- Context ----
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---- Provider ----
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Pastikan dokumen users/{uid} ada (tanpa mengubah role dari klien)
        try {
          await setDoc(
            doc(db, 'users', u.uid),
            {
              email: u.email ?? '',
              isOnline: true,
              lastLoginAt: serverTimestamp(),
            },
            { merge: true }
          );
        } catch {}

        // Refresh token (ambil custom claims terbaru kalau ada)
        try {
          await getIdToken(u, true);
        } catch {}
      }
    });

    return unsubscribe; // cleanup listener saat unmount
  }, []);

  const handleLogout = async () => {
    const u = auth.currentUser;
    if (u) {
      try {
        await setDoc(
          doc(db, 'users', u.uid),
          { isOnline: false, lastLogoutAt: serverTimestamp() },
          { merge: true }
        );
      } catch {}
      await signOut(auth);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ---- Hook ----
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};
