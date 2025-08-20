import React, { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// Context agar bisa diakses dari mana saja
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Set online saat login
        try {
          await updateDoc(doc(db, "users", u.uid), { isOnline: true });
        } catch (err) {}
        // Set offline kalau browser/tab close
        const setOffline = async () => {
          try {
            await updateDoc(doc(db, "users", u.uid), { isOnline: false });
          } catch (err) {}
        };
        window.addEventListener("beforeunload", setOffline);
        // Cleanup
        return () => window.removeEventListener("beforeunload", setOffline);
      }
    });
    return () => unsub();
  }, []);

  // Fungsi logout: panggil ini jika mau logout
  const handleLogout = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), { isOnline: false });
      } catch (err) {}
      await signOut(auth);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
