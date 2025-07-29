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
import { Product } from '@/data/products';

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
  const [notif, setNotif] = useState(" ");

  // Cek login
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, user => {
      if (!user) navigate('/in');
    });
    return unsubAuth;
  }, [navigate]);

  // Fetch & sort data terbaru di atas
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), snap => {
      const items = snap.docs.map(d => {
        const data = d.data() as any;
        return {
          id: d.id,
          ...data,
          createdAt: data.createdAt?.seconds || 0
        };
      });
      items.sort((a, b) => b.createdAt - a.createdAt); // Terbaru di atas
      setProducts(items);
    });
    return unsub;
  }, []);

  // Kategori diambil dari produk yang ada di database (bukan dari static)
  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleChange = (key: keyof Product, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const addProduct = async () => {
    if (!form.name || !form.category || !form.brand) {
      alert('Lengkapi Form Terlebih Dahulu');
      return;
    }
    try {
      const ref = await addDoc(collection(db, 'products'), {
        ...form,
        createdAt: serverTimestamp() 
      });
      await updateDoc(doc(db, 'products', ref.id), { id: ref.id });
      setForm(initialForm);
    } catch {
      alert('Failed to add product.');
    }
  };

  const saveProduct = async () => {
    if (!editing) return;
    await updateDoc(doc(db, 'products', editing.id), form as any);
    setEditing(null);
    setForm(initialForm);
  };

  const removeProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  const startEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(initialForm);
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
    <div className="p-6 max-w-[90rem] mx-auto bg-gradient-to-r from-gray-500 to-gray-900 text-gray-600">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 gap-4">
      <div className="relative flex items-center" style={{ height: 80 }}> {/* 80px = h-20 */}
          <img
            src="/image/logo.png"
            alt="Admin Logo"
            className="h-32 w-auto object-contain"
            style={{ marginTop: -24, marginBottom: -24 }}
          />
        </div>
      <button
        onClick={async () => {
          const confirm = window.confirm("Apakah Anda yakin ingin logout?");
          if (confirm) {
            await signOut(auth);
            navigate('/in');
          }
        }}
        className="w-full md:w-auto py-2 px-4 bg-gray-200 text-black rounded-lg font-semibold shadow hover:from-black hover:to-gray-700 transition"
      >
        Logout
      </button>
    </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          className="w-full sm:w-full p-2 border rounded focus:ring focus:ring-gray-200 focus:border-black transition"
          placeholder="Search by name, category, or brand..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="px-3 py-2 bg-gray-300 rounded text-xs font-medium hover:bg-gray-400 transition"
            onClick={() => setSearch('')}
          >Clear</button>
        )}
      </div>

      {/* Form Add / Edit */}
  <div className="mb-8 space-y-6 border p-6 rounded-2xl bg-white/70 shadow-md">
    <h2 className="font-bold text-lg text-gray-700 dark:text-white mb-2 flex items-center gap-2">
      {editing ? (
        <span>
          <svg className="inline w-5 h-5 text-gray-500 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-1.5A2.5 2.5 0 0121 9.5V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h7.5a2.5 2.5 0 012.036 1.268z" /></svg>
          Edit Product
        </span>
      ) : (
        <span>
          <svg className="inline w-5 h-5 text-black mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add New Product
        </span>
      )}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Name</label>
        <input
          className="w-full p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
          value={form.name || ""}
          onChange={e => handleChange("name", e.target.value)}
          placeholder="Name"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Category</label>
        <select
          className="w-full p-2 border rounded bg-white focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
          value={form.category || ""}
          onChange={e => handleChange("category", e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Brand</label>
        <input
          className="w-full p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
          value={form.brand || ""}
          onChange={e => handleChange("brand", e.target.value)}
          placeholder="Brand"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Price</label>
        <input
          type="number"
          className="w-full p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
          value={form.price !== undefined && form.price !== null ? form.price : ""}
          onChange={e => handleChange("price", e.target.value === "" ? undefined : +e.target.value)}
          placeholder="Price"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Original Price</label>
        <input
  type="number"
  className="w-full p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
  value={form.originalPrice ?? ""}
  onChange={e =>
    handleChange(
      "originalPrice",
      e.target.value === "" ? undefined : +e.target.value
    )
  }
  placeholder="Original Price (optional)"
/>

      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Stock (total)</label>
        <input
  type="number"
  className="w-full p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
  value={form.stock !== undefined && form.stock !== null ? form.stock : ""}
  onChange={e => handleChange("stock", e.target.value === "" ? undefined : +e.target.value)}
  placeholder="Stock"
/>

      </div>
    </div>

    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-600">Description</label>
      <textarea
        className="w-full p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
        rows={3}
        value={form.description || ""}
        onChange={e => handleChange("description", e.target.value)}
        placeholder="Description"
      />
    </div>

    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-600">Images <span className="text-gray-400 text-xs">(Pakai Koma ,)</span></label>
      <input
        className="w-full p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
        value={(form.images || []).join(", ")}
        onChange={e =>
          handleChange("images", e.target.value.split(",").map(s => s.trim()))
        }
        placeholder="Gambar Depan, Gambar Belakang"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {(form.images || []).filter(Boolean).slice(0,3).map((url, idx) => (
          <img key={idx} src={url} alt="" className="w-32 h-32 rounded object-cover border" />
        ))}
      </div>
    </div>

    {/* Dynamic Sizes */}
    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-600">Sizes & Stock</label>
      <div className="space-y-2">
        {(form.sizes || []).map((s: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              className="w-1/2 p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
              placeholder="Size"
              value={s.size}
              onChange={e => updateSize(idx, "size", e.target.value)}
            />
            <input
              type="number"
              className="w-1/2 p-2 border rounded focus:ring focus:ring-gray-200 focus:border-gray-400 transition"
              placeholder="Stock"
              value={s.stock}
              onChange={e => updateSize(idx, "stock", e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          className="mt-2 px-4 py-1 bg-gray-600 text-white rounded shadow hover:bg-gray-700 transition"
          onClick={addSizeRow}
        >
          + Add Size
        </button>
      </div>
    </div>

    {/* Actions */}
    <div className="pt-2 flex gap-2">
      {editing ? (
        <>
          <button
            className="px-5 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-700 transition"
            onClick={saveProduct}
          >
            Save
          </button>
          <button
            className="px-5 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          className="px-5 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
          onClick={addProduct}
        >
          Add Product
        </button>
      )}
    </div>
  </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-2xl shadow-lg bg-white/90">
  <table className="min-w-[650px] w-full text-[15px]">
    <thead className="sticky top-0 z-10">
      <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-sm">
        <th className="border-b px-4 py-3 font-semibold text-left rounded-tl-2xl">Name</th>
        <th className="border-b px-4 py-3 font-semibold text-left">Category</th>
        <th className="border-b px-4 py-3 font-semibold text-left">Brand</th>
        <th className="border-b px-4 py-3 font-semibold text-right">Price</th>
        <th className="border-b px-4 py-3 font-semibold text-right">Stock</th>
        <th className="border-b px-4 py-3 font-semibold text-center rounded-tr-2xl">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.length > 0 ? (
        filteredProducts
          .slice((page - 1) * perPage, page * perPage)
          .map((p, idx) => (
            <tr
              key={p.id}
              className={`transition ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'} hover:bg-gray-100/70`}
            >
              <td className="border-b px-4 py-3">{p.name}</td>
              <td className="border-b px-4 py-3">{p.category}</td>
              <td className="border-b px-4 py-3">{p.brand}</td>
              <td className="border-b px-4 py-3 text-right">
                <span className="tabular-nums font-mono text-gray-800">
                  Rp {p.price?.toLocaleString()}
                </span>
              </td>
              <td className="border-b px-4 py-3 text-right">
                <span className="font-semibold">{p.stock}</span>
              </td>
              <td className="border-b px-4 py-3 text-center space-x-1">
              <button
                  title="Edit"
                  className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition"
                  onClick={() => startEdit(p)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2822/2822504.png"
                    alt="Edit"
                    className="w-5 h-5 object-contain"
                  />
                </button>

                <button
                  title="Delete"
                  className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-red-50 text-red-600 hover:text-red-800 transition"
                  onClick={() => removeProduct(p.id)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" 
                    alt="Edit"
                    className="w-5 h-5 object-contain"
                  />
                </button>
              </td>
            </tr>
          ))
      ) : (
        <tr>
          <td
            colSpan={6}
            className="text-center py-8 text-gray-400 font-medium bg-white"
          >
            No products found.
          </td>
        </tr>
      )}
    </tbody>
  </table>

  {/* PAGINATION */}
  {filteredProducts.length > perPage && (
    <div className="flex justify-center items-center gap-1 py-4 flex-wrap bg-white rounded-b-2xl">
      <button
        className={`px-3 py-1 rounded-lg border text-[15px] ${
          page === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50 text-gray-700'
        }`}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array.from(
        { length: Math.ceil(filteredProducts.length / perPage) },
        (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-lg border font-semibold text-[15px] ${
              page === i + 1
                ? 'bg-gray-600 text-white'
                : 'bg-white hover:bg-gray-50 text-gray-700'
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        )
      )}
      <button
        className={`px-3 py-1 rounded-lg border text-[15px] ${
          page === Math.ceil(filteredProducts.length / perPage)
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50 text-gray-700'
        }`}
        onClick={() =>
          setPage((p) =>
            Math.min(
              Math.ceil(filteredProducts.length / perPage),
              p + 1
            )
          )
        }
        disabled={page === Math.ceil(filteredProducts.length / perPage)}
      >
        &gt;
      </button>
    </div>
  )}
</div>


    </div>
  );
};

export default ProductsDashboard;
