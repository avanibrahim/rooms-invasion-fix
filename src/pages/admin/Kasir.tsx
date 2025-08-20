import React, { useState, useEffect } from "react";
import { Wallet2, Search, X, ChevronsLeft, ChevronsRight } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type SizeType = { size: string; stock: number };
type Product = {
  id: string;
  name: string;
  category: string;
  brand?: string;
  price: number;
  stock: number;
  images?: string[];
  sizes?: SizeType[];
  createdAt?: any;
};

export default function Cashier() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);
  const [checkoutQty, setCheckoutQty] = useState<{ [id: string]: number }>({});
  const [selectedSize, setSelectedSize] = useState<{ [id: string]: string }>({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // --- Ambil user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // --- Ambil data produk
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("name"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(
        snap.docs.map((d) => ({ ...d.data(), id: d.id })) as Product[]
      );
    });
    return () => unsub();
  }, []);

  // --- Filtering & Sorting
  let filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(s) ||
      (p.category && p.category.toLowerCase().includes(s)) ||
      (p.brand && p.brand.toLowerCase().includes(s))
    );
  });

  filteredProducts = [
    ...filteredProducts.filter((p) => p.stock > 0).sort((a, b) => a.name.localeCompare(b.name)),
    ...filteredProducts.filter((p) => p.stock <= 0).sort((a, b) => a.name.localeCompare(b.name)),
  ];

  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // --- Checkout handler
  const handleCheckout = async (product: Product) => {
    if (!user) return;
    // --- Jika produk punya size
    if (product.sizes && product.sizes.length > 0) {
      const size = selectedSize[product.id];
      if (!size) return alert("Pilih ukuran dulu!");
      const selectedSizeObj = product.sizes.find((s) => s.size === size);
      const qty = checkoutQty[product.id] || 1;
      if (!selectedSizeObj || qty < 1 || qty > selectedSizeObj.stock)
        return alert("Jumlah tidak valid untuk size tersebut!");

      // Simpan sales
      await addDoc(collection(db, "sales"), {
        product: product.name,
        category: product.category,
        size,
        qty,
        price: product.price,
        date: serverTimestamp(),
        uid: user.uid,
      });

      // Kurangi stock size & total
      const newSizes = product.sizes.map((s) =>
        s.size === size ? { ...s, stock: s.stock - qty } : s
      );
      const newStock = newSizes.reduce((t, s) => t + s.stock, 0);

      await updateDoc(doc(db, "products", product.id), {
        sizes: newSizes,
        stock: newStock,
      });

      alert(`Berhasil checkout: ${qty}x ${product.name} size ${size}`);

      setCheckoutQty((prev) => ({ ...prev, [product.id]: 1 }));
      setSelectedSize((prev) => ({ ...prev, [product.id]: "" }));
      return;
    }

    // --- Tanpa size (produk lama)
    const qty = checkoutQty[product.id] || 1;
    if (qty < 1 || qty > product.stock) {
      alert("Jumlah tidak valid!");
      return;
    }
    await addDoc(collection(db, "sales"), {
      product: product.name,
      category: product.category,
      qty,
      price: product.price,
      date: serverTimestamp(),
      uid: user.uid,
    });
    await updateDoc(doc(db, "products", product.id), {
      stock: product.stock - qty,
    });
    alert(`Berhasil checkout: ${qty}x ${product.name}`);
    setCheckoutQty((prev) => ({ ...prev, [product.id]: 1 }));
  };

  useEffect(() => { setPage(1); }, [search]);

  // --- Utility untuk dapatkan stok size terpilih (agar qty tidak melebihi)
  const getSelectedStock = (p: Product) => {
    if (p.sizes && p.sizes.length > 0 && selectedSize[p.id]) {
      const obj = p.sizes.find(s => s.size === selectedSize[p.id]);
      return obj?.stock || 0;
    }
    return p.stock;
  };

  return (
    <div className="max-w-full px-2 sm:px-6 md:px-0 py-0">
      {/* HEADER */}
      <header className="w-full px-4 py-3 z-20 flex items-center">
        <div className="flex items-center gap-3">
          <Wallet2 className="w-7 h-7 text-gray-100" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Cashier</span>
        </div>
      </header>
      {/* Modal Preview */}
      {previewImg && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setPreviewImg(null)}>
          <img src={previewImg} alt="Preview" className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white object-contain transition" onClick={e => e.stopPropagation()} />
          <button className="absolute top-4 right-6 text-white bg-black/50 rounded-full p-2 text-2xl hover:bg-black/80" onClick={() => setPreviewImg(null)}>✕</button>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative flex w-full transition-all duration-200 ease-in-out">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none z-10"><Search size={20} /></span>
          <input
            type="text"
            className="w-full py-3 pl-12 pr-12 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl shadow-xl text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none ring-0 focus:border-gray-400/70 focus:ring-4 focus:ring-gray-200/30 focus:bg-white/70"
            placeholder="Search by name, category, or brand..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
          />
          {search && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 rounded-full bg-white/90 hover:bg-gray-200 transition shadow"
              onClick={() => setSearch('')}
              tabIndex={0}
              aria-label="Clear search"
              type="button"
            ><X size={18} /></button>
          )}
        </div>
      </div>
      {/* Pagination */}
      {filteredProducts.length > perPage && (
        <div className="flex justify-center md:justify-start items-center gap-1 py-4 flex-wrap">
          <button
            className={`px-3 py-1 rounded-lg border text-base flex items-center justify-center ${page === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50 text-gray-700"}`}
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          ><ChevronsLeft className="w-5 h-5" /></button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-lg border font-semibold text-base ${page === i + 1 ? "bg-gray-600 text-white" : "bg-white hover:bg-gray-50 text-gray-700"}`}
              onClick={() => setPage(i + 1)}
            >{i + 1}</button>
          ))}
          <button
            className={`px-3 py-1 rounded-lg border text-base flex items-center justify-center ${page === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50 text-gray-700"}`}
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          ><ChevronsRight className="w-5 h-5" /></button>
        </div>
      )}

      {/* Produk Table (Desktop) */}
      <div className="w-full">
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white/90">
          <table className="min-w-[950px] w-full text-base">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-500 text-gray-200">
                <th className="px-4 py-3 text-left border-r border-gray-300" style={{ width: 68 }}>Image</th>
                <th className="px-4 py-3 text-left border-r border-gray-300">Name</th>
                <th className="px-4 py-3 text-left border-r border-gray-300">Category</th>
                <th className="px-4 py-3 text-left border-r border-gray-300">Brand</th>
                <th className="px-4 py-3 text-left border-r border-gray-300" style={{ minWidth: 110 }}>Price</th>
                {/* === Tambah kolom Size === */}
                <th className="px-4 py-3 text-center border-r border-gray-300" style={{ minWidth: 90 }}>Size</th>
                <th className="px-4 py-3 text-center border-r border-gray-300" style={{ minWidth: 90 }}>Stock</th>
                <th className="px-4 py-3 text-center border-r border-gray-300" style={{ minWidth: 90 }}>Qty</th>
                <th className="px-4 py-3 text-center" style={{ minWidth: 130 }}>Checkout</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => (
                  <tr key={p.id} className="transition hover:bg-gray-50">
                    <td className="px-4 py-3 border-r border-gray-200" style={{ width: 68, minWidth: 56 }}>
                      {p.images && p.images[0] ? (
                        <img src={p.images[0]} alt={p.name} className="block w-12 h-12 rounded object-cover border mx-auto cursor-pointer hover:scale-105 transition"
                          onClick={() => setPreviewImg(p.images[0])} />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs mx-auto">No Img</div>
                      )}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-200">{p.name}</td>
                    <td className="px-4 py-3 border-r border-gray-200">{p.category}</td>
                    <td className="px-4 py-3 border-r border-gray-200">{p.brand || "-"}</td>
                    <td className="px-4 py-3 text-left font-mono border-r border-gray-200" style={{ minWidth: 110 }}>Rp {p.price?.toLocaleString()}</td>
                    {/* === Pilihan Size === */}
                    <td className="px-4 py-3 text-center border-r border-gray-200" style={{ minWidth: 90 }}>
                      {p.sizes && p.sizes.length > 0 ? (
                        <select
                          className="border rounded px-2 py-1"
                          value={selectedSize[p.id] || ""}
                          onChange={e => setSelectedSize(q => ({ ...q, [p.id]: e.target.value }))}
                        >
                          <option value="">Pilih size</option>
                          {p.sizes.map((s) => (
                            <option key={s.size} value={s.size} disabled={s.stock < 1}>
                              {s.size} ({s.stock})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-gray-400 italic">-</span>
                      )}
                    </td>
                    {/* === Stock untuk size terpilih (atau total) === */}
                    <td className="px-4 py-3 text-center border-r border-gray-200" style={{ minWidth: 90 }}>
                      {p.sizes && p.sizes.length > 0
                        ? (selectedSize[p.id]
                            ? (p.sizes.find(s => s.size === selectedSize[p.id])?.stock || 0)
                            : <span className="text-gray-400">Pilih size</span>)
                        : (p.stock === 0
                          ? (<span className="text-red-600 font-bold">Out Of Stock</span>)
                          : p.stock)}
                    </td>
                    {/* === Qty === */}
                    <td className="px-4 py-3 text-center border-r border-gray-200" style={{ minWidth: 90 }}>
                      <input
                        type="number"
                        min={1}
                        max={getSelectedStock(p)}
                        value={checkoutQty[p.id] || 1}
                        onChange={e => setCheckoutQty(q => ({ ...q, [p.id]: Number(e.target.value) }))}
                        className="w-16 border border-neutral-200 rounded px-2 py-1 text-base"
                        disabled={p.sizes && p.sizes.length > 0 ? !selectedSize[p.id] : p.stock < 1}
                      />
                    </td>
                    {/* === Checkout === */}
                    <td className="px-4 py-3 text-center" style={{ minWidth: 130 }}>
                      <button
                        className={`px-4 py-2 rounded font-bold shadow transition text-white ${p.sizes && p.sizes.length > 0
                          ? (!selectedSize[p.id] || getSelectedStock(p) < 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-cyan-700 hover:bg-cyan-900")
                          : (p.stock < 1 ? "bg-gray-300 cursor-not-allowed" : "bg-cyan-700 hover:bg-cyan-900")}`}
                        onClick={() => handleCheckout(p)}
                        disabled={p.sizes && p.sizes.length > 0
                          ? !selectedSize[p.id] || getSelectedStock(p) < 1
                          : p.stock < 1}
                      >
                        {p.sizes && p.sizes.length > 0
                          ? (!selectedSize[p.id] ? "Pilih Size" : (getSelectedStock(p) < 1 ? "Sold" : "Checkout"))
                          : (p.stock < 1 ? "Sold" : "Checkout")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-400">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Card List: Mobile */}
        <div className="md:hidden space-y-4">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((p) => (
              <div key={p.id} className="bg-white/90 rounded-xl shadow px-4 py-3 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  {p.images && p.images[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded object-cover border cursor-pointer hover:scale-105 transition"
                      onClick={() => setPreviewImg(p.images[0])} />
                  ) : (
                    <div className="w-14 h-14 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-base">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.category}{p.brand && ` | ${p.brand}`}</div>
                  </div>
                </div>
                {/* Size */}
                {p.sizes && p.sizes.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Size:</span>
                    <select
                      className="border rounded px-2 py-1"
                      value={selectedSize[p.id] || ""}
                      onChange={e => setSelectedSize(q => ({ ...q, [p.id]: e.target.value }))}
                    >
                      <option value="">Pilih size</option>
                      {p.sizes.map((s) => (
                        <option key={s.size} value={s.size} disabled={s.stock < 1}>
                          {s.size} ({s.stock})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex justify-between items-end mt-2">
                  <div>
                    <span className="text-xs text-gray-500">Harga:</span>
                    <div className="font-mono font-bold">Rp {p.price?.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Stok:</span>
                    <div className="font-bold">
                      {p.sizes && p.sizes.length > 0
                        ? (selectedSize[p.id]
                            ? (p.sizes.find(s => s.size === selectedSize[p.id])?.stock || 0)
                            : <span className="text-gray-400">Pilih size</span>)
                        : (p.stock === 0
                          ? <span className="text-red-600">Sold</span>
                          : p.stock)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <input
                      type="number"
                      min={1}
                      max={getSelectedStock(p)}
                      value={checkoutQty[p.id] || 1}
                      onChange={e => setCheckoutQty(q => ({ ...q, [p.id]: Number(e.target.value) }))}
                      className="w-16 border border-neutral-200 rounded px-2 py-1 text-base"
                      disabled={p.sizes && p.sizes.length > 0 ? !selectedSize[p.id] : p.stock < 1}
                    />
                    <button
                      className={`w-full px-4 py-2 rounded font-bold shadow transition text-white ${p.sizes && p.sizes.length > 0
                        ? (!selectedSize[p.id] || getSelectedStock(p) < 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-cyan-700 hover:bg-cyan-900")
                        : (p.stock < 1 ? "bg-gray-300 cursor-not-allowed" : "bg-cyan-700 hover:bg-cyan-900")}`}
                      onClick={() => handleCheckout(p)}
                      disabled={p.sizes && p.sizes.length > 0
                        ? !selectedSize[p.id] || getSelectedStock(p) < 1
                        : p.stock < 1}
                    >
                      {p.sizes && p.sizes.length > 0
                        ? (!selectedSize[p.id] ? "Pilih Size" : (getSelectedStock(p) < 1 ? "Sold" : "Checkout"))
                        : (p.stock < 1 ? "Sold" : "Checkout")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 font-medium bg-white rounded-xl shadow">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
