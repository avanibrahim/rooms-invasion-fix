import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Index';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Lookbook from './pages/Lookbook';
import Contact from './pages/Contact';
import CheckOut from './pages/CheckOut';
import CartSidebar from './components/CartSidebar';
import { useCartStore } from './store/cartStore';
import { Toaster } from './components/ui/toaster';
import ScrollToTop from './components/ScrollToTop'; 
import AdminDashboard from '@/pages/admin/Dashboard';
import Login from '@/pages/admin/Login';
import NotFound from './pages/NotFound';

import { useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


// DIHAPUS: import { seedProducts } ... dan useEffect ...

function App() {
  const { isOpen, toggleCart } = useCartStore();

  useEffect(() => {
    let currentUid = null;
  
    // AUTO CREATE USER DATA IF NOT EXISTS
    const createUserIfNotExists = async (user) => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          name: user.displayName || "",
          email: user.email,
          role: "user",
          isOnline: true,
          lastLoginAt: serverTimestamp(),
        });
      }
    };
  
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUid = user.uid;
        await createUserIfNotExists(user); // <-- ini WAJIB
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            isOnline: true,
            lastLoginAt: serverTimestamp(),
          });
        } catch (e) {
          // error log kalau perlu
        }
      }
    });
  
    // Set offline ketika tab/browser ditutup
    const setOffline = async () => {
      if (currentUid) {
        try {
          await updateDoc(doc(db, 'users', currentUid), { isOnline: false });
        } catch (e) {}
      }
    };
    window.addEventListener('beforeunload', setOffline);
  
    return () => {
      unsub();
      window.removeEventListener('beforeunload', setOffline);
    };
  }, []);
  

  // ...sisanya tetap!


  return (
    <Router>
      <div className="App">
        <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/takezon" element={<AdminDashboard />} />
          <Route path="/in" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <CartSidebar isOpen={isOpen} onClose={toggleCart} />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
