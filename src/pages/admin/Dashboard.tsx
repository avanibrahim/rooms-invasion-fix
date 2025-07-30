import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { Product, products as staticProducts } from '@/data/products';
import { Boxes, FilePlus, Users, LogOut } from 'lucide-react';

import UserAdmin from './UserAdmin';
import AddProduct from './AddProduct';
import AllProducts from './AllProduct';
import Footer from '@/components/Footer';

const initialForm: Partial<Product> = {
  name: '',
  description: '',
  price: 0,
  originalPrice: undefined,
  images: [],
  category: '',
  brand: '',
  stock: undefined,
  sizes: [
    { size: 'S', stock: undefined },
    { size: 'M', stock: undefined },
    { size: 'L', stock: undefined },
    { size: 'XL', stock: undefined }
  ]
};

const ProductsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>(initialForm);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;
  const [tab, setTab] = useState<'add' | 'all' | 'users'>('all');


  // Cek login
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, user => {
      if (!user) navigate('/in');
    });
    return unsubAuth;
  }, [navigate]);

  // Sync produk real-time: new (belum ada di static), lalu urutan static
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      snap => {
        const live = snap.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as any)
        }));
        const staticMap = new Map(staticProducts.map((p, idx) => [p.id, idx]));
        const newItems = live.filter(p => !staticMap.has(p.id));
        const staticItems = live
          .filter(p => staticMap.has(p.id))
          .sort((a, b) => staticMap.get(a.id)! - staticMap.get(b.id)!);
        setProducts([...newItems, ...staticItems]);
      }
    );
    return () => unsub();
  }, []);

  // Kategori dinamis
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Handle perubahan form
  const handleChange = (key: keyof Product, value: any) => {
    setForm(prev => {
      // Otomatis hilangkan sizes jika accessories/shorts
      if (
        key === "category" &&
        ["accessories", "accesories", "shorts"].includes(value.toLowerCase())
      ) {
        return { ...prev, [key]: value, sizes: [] };
      }
      return { ...prev, [key]: value };
    });
  };

  const addProduct = async () => {
    if (!form.name || !form.category || !form.brand) {
      alert('Lengkapi Form Terlebih Dahulu');
      return;
    }
    // Clean field undefined/null/empty
    let data: any = { ...form, createdAt: serverTimestamp() };
  
    // Bersihkan field undefined/null sebelum upload
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined || data[key] === null || data[key] === "") {
        delete data[key];
      }
    });
  
    if (
      !data.sizes ||
      data.sizes.length === 0 ||
      ["accessories", "accesories", "shorts"].includes((data.category || "").toLowerCase())
    ) {
      delete data.sizes;
    }
    try {
      const ref = await addDoc(collection(db, 'products'), data);
      await updateDoc(doc(db, 'products', ref.id), { id: ref.id });
      setForm(initialForm);
      setTab('all');
    } catch (err: any) {
      alert('Failed to add product.\n' + (err?.message || ""));
    }
  };
  

  const saveProduct = async () => {
    if (!editing) return;
    let data: any = { ...form };
    if (
      !data.sizes ||
      data.sizes.length === 0 ||
      ["accessories", "accesories", "shorts"].includes((data.category || "").toLowerCase())
    ) {
      delete data.sizes;
    }
    await updateDoc(doc(db, 'products', editing.id), data);
    setEditing(null);
    setForm(initialForm);
    setTab('all');
  };

  const removeProduct = async (id: string) => {
    if (window.confirm("Yakin ingin hapus produk ini?")) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  const startEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
    setTab('add');
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(initialForm);
    setTab('all');
  };

  const updateSize = (i: number, field: 'size' | 'stock', val: any) => {
    const arr = [...(form.sizes || [])] as any[];
    arr[i] = { ...arr[i], [field]: field === 'stock' ? +val : val };
    handleChange('sizes', arr);
  };

  const addSizeRow = () => {
    handleChange('sizes', [...(form.sizes || []), { size: '', stock: undefined }]);
  };

  // --- Filtered products based on search ---
  const filteredProducts = products.filter(p =>
    (p.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (p.category?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (p.brand?.toLowerCase() || '').includes(search.toLowerCase())
  );

  useEffect(() => {
    setPage(1);
  }, [search, filteredProducts.length]);

  return (
    <div className="p-6 max-w-[90rem] mx-auto bg-gradient-to-r from-gray-400 to-gray-400 text-gray-500 min-h-screen">

        {/* TOPBAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-4 mb-8 bg-gray-800 rounded-xl shadow-lg">
            {/* Kiri: Logo + Teks */}
            <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
              <img
                src="/admin.png"
                alt="Admin Logo"
                className="h-16 w-auto object-contain filter invert"
                draggable={false}
              />
              <div className="flex flex-col">
                <span className="block text-lg sm:text-xl font-bold text-gray-200 tracking-tight leading-tight">
                  Admin Dashboard
                </span>
                <p className="text-xs sm:text-sm text-gray-100 mt-1 max-w-xs sm:max-w-sm md:max-w-md">
                  Welcome Back Admin, Keep Read the Note!
                </p>
              </div>
            </div>
            {/* Kanan: Logout Button */}
            <button
  onClick={async () => {
    const confirm = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirm) {
      await signOut(auth);
      navigate('/in');
    }
  }}
  className="flex items-center gap-2 py-2 px-5 bg-white/90 text-gray-900 rounded-lg font-semibold shadow hover:bg-gray-500 transition w-full max-w-xs sm:w-auto sm:max-w-none"
>
  <LogOut size={18} className="inline-block" />
  Logout
</button>
          </div>

        {/* Tab Menu */}
        <div className="flex gap-[0.3rem] mb-6 flex-wrap">
           <button
            onClick={() => setTab('all')}
            className={`
              flex items-center gap-2
              px-4 py-2 rounded-xl font-bold
              ${tab === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 border'}
            `}
          >
            <Boxes size={18} className="inline-block" />
            Products
          </button>
          <button
            onClick={() => setTab('add')}
            className={`
              flex items-center gap-2
              px-4 py-2 rounded-xl font-bold
              ${tab === 'add' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 border'}
            `}
          >
            <FilePlus size={18} className="inline-block" />
            Product
          </button>
          <button
            onClick={() => setTab('users')}
            className={`
              flex items-center gap-2
              px-4 py-2 rounded-xl font-bold
              ${tab === 'users' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 border'}
            `}
          >
            <Users size={18} className="inline-block" />
            Users
          </button>
        </div>

        {/* Content Tab */}
        {tab === 'add' && (
            <AddProduct
              form={form}
              handleChange={handleChange}
              addProduct={addProduct}
              editing={editing}
              saveProduct={saveProduct}
              cancelEdit={cancelEdit}
              updateSize={updateSize}
              addSizeRow={addSizeRow}
              categories={categories}
            />
          )}
          {tab === 'all' && (
            <AllProducts
              products={products}
              search={search}
              setSearch={setSearch}
              filteredProducts={filteredProducts}
              page={page}
              setPage={setPage}
              perPage={perPage}
              startEdit={startEdit}
              removeProduct={removeProduct}
            />
          )}
          {tab === 'users' && (
            <UserAdmin />
          )}
      </div>
          
  );
};

export default ProductsDashboard;
