import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { TrendingUp, Wallet2, ArrowDown, ArrowUp, Download } from "lucide-react";

// FIREBASE
import { db, auth } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// XLSX EXPORT
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type Sale = {
  id: string;
  product: string;
  category: string;
  qty: number;
  price: number;
  date: any; // Timestamp/Date
  uid: string;
};

const WEEK_TARGET = 1000000;

export default function FinanceAndProduct() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [form, setForm] = useState({
    product: "",
    category: "",
    qty: "",
    price: "",
  });
  const [user, setUser] = useState<any>(null);

  // 1. Pantau login user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // 2. Ambil data Firestore, sync realtime, filter by user
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "sales"),
      where("uid", "==", user.uid),
      orderBy("date", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setSales(
        snap.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as Sale[]
      );
    });
    return () => unsub();
  }, [user]);

  // 3. Tambah data ke Firestore
  const addSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product || !form.category || !form.qty || !form.price) return;
    if (!user) return;
    await addDoc(collection(db, "sales"), {
      product: form.product,
      category: form.category,
      qty: Number(form.qty),
      price: Number(form.price),
      date: serverTimestamp(),
      uid: user.uid,
    });
    setForm({ product: "", category: "", qty: "", price: "" });
  };

  // 4. Data chart: group 7 hari terakhir
  const groupedWeek = useMemo(() => {
    const days: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" });
      days[label] = 0;
    }
    sales.forEach((s) => {
      const d = s.date?.toDate ? s.date.toDate() : new Date(s.date);
      const label = d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" });
      if (days[label] !== undefined) days[label] += s.qty * s.price;
    });
    return days;
  }, [sales]);

  const weekTotal = Object.values(groupedWeek).reduce((a, b) => a + b, 0);

  const chartData = {
    labels: Object.keys(groupedWeek),
    datasets: [
      {
        label: "Pendapatan per Hari (Rp)",
        data: Object.values(groupedWeek),
        backgroundColor: "#0e7490", // cyan-700
        borderRadius: 8,
        maxBarThickness: 36,
      },
    ],
  };

  // 5. Export ke Excel
  const handleExportExcel = () => {
    if (!sales.length) return;
    // mapping tanggal
    const rows = sales.map((s) => ({
      "Tanggal": (s.date?.toDate ? s.date.toDate() : new Date(s.date)).toLocaleDateString("id-ID"),
      "Produk": s.product,
      "Kategori": s.category,
      "Stok": s.qty,
      "Harga": s.price,
      "Total": s.qty * s.price,
    }));
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Penjualan");
    const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "riwayat-penjualan.xlsx");
  };

  // 6. Render
  return (
    <div className="max-w-full px-2 sm:px-6 md:px-0 py-0">
      {/* HEADER */}
      <header className="w-full px-4 py-3 z-20 flex items-center">
        <div className="flex items-center gap-3">
          <Wallet2 className="w-7 h-7 text-gray-100" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Financial Management</span>
        </div>
      </header>

      {/* SUMMARY BAR */}
      <section className="w-full max-w-full mx-auto mt-0 mb-8 flex flex-col gap-5 sm:gap-8 sm:flex-row px-2 sm:px-0">
        <div className="flex-1 bg-white rounded-3xl shadow-lg px-6 py-5 flex flex-col items-start gap-3 hover:scale-[1.03] transition">
          <div className="flex items-center gap-3 text-gray-700 font-semibold">
            <TrendingUp className="w-6 h-6 text-green-700" />
            Target Minggu Ini
          </div>
          <div className="text-3xl font-bold text-gray-900">
            Rp {WEEK_TARGET.toLocaleString()}
          </div>
          <div className={`text-sm font-semibold mt-2 ${weekTotal >= WEEK_TARGET ? "text-green-700" : "text-orange-700"}`}>
            {weekTotal >= WEEK_TARGET ? "Tercapai!" : `Kurang Rp ${(WEEK_TARGET - weekTotal).toLocaleString()}`}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-3xl shadow-lg px-6 py-5 flex flex-col items-start gap-3 hover:scale-[1.03] transition">
          <div className="flex items-center gap-3 text-gray-700 font-semibold">
            <ArrowUp className="w-6 h-6 text-blue-700" />
            Pendapatan Mingguan
          </div>
          <div className="text-3xl font-bold text-gray-900">
            Rp {weekTotal.toLocaleString()}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-3xl shadow-lg px-6 py-5 flex flex-col items-start gap-3 hover:scale-[1.03] transition">
          <div className="flex items-center gap-3 text-gray-700 font-semibold">
            <ArrowDown className="w-6 h-6 text-pink-700" />
            Total Transaksi
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {sales.length}
          </div>
        </div>
      </section>

      {/* CHART */}
      <section className="w-full max-w-full mx-auto px-2 sm:px-0 mb-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 flex flex-col items-center">
          <div className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-700" /> Grafik Pendapatan Mingguan
          </div>
          <div className="w-full h-48 sm:h-72">
            <Bar
              data={chartData}
              options={{
                plugins: { legend: { display: false } },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true, ticks: { color: "#333" }, grid: { color: "#eee" } },
                  x: { ticks: { color: "#333" }, grid: { color: "#eee" } }
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="w-full max-w-full mx-auto px-2 sm:px-0">
        <form
          onSubmit={addSale}
          className="w-full bg-white rounded-2xl shadow-md p-4 sm:p-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <input
            className="flex-1 border border-neutral-200 rounded px-3 py-2 text-base bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            type="text"
            placeholder="Nama Produk"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            required
          />
          <input
            className="flex-1 border border-neutral-200 rounded px-3 py-2 text-base bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            type="text"
            placeholder="Kategori"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            className="w-28 border border-neutral-200 rounded px-3 py-2 text-base bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            type="number"
            placeholder="Stok"
            value={form.qty}
            min={1}
            onChange={(e) => setForm({ ...form, qty: e.target.value })}
            required
          />
          <input
            className="w-36 border border-neutral-200 rounded px-3 py-2 text-base bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            type="number"
            placeholder="Harga Satuan"
            value={form.price}
            min={1}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <button
            className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold rounded px-6 py-2 transition text-base shadow"
            type="submit"
          >
            Add
          </button>
        </form>
      </section>

      {/* TABLE + EXPORT BUTTON */}
      <section className="w-full max-w-full mx-auto mt-10 mb-10 px-2 sm:px-0">
        <div className="bg-white rounded-2xl shadow-md p-3 sm:p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-gray-900 text-lg">Riwayat Penjualan</div>
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow text-sm font-bold transition"
              title="Export ke Excel"
              disabled={!sales.length}
            >
              <Download size={18} /> Export Excel
            </button>
          </div>
          <table className="w-full text-base min-w-[680px] border-separate border-spacing-y-1">
            <thead>
              <tr>
                <th className="p-2 text-gray-600 font-semibold">Tanggal</th>
                <th className="p-2 text-gray-600 font-semibold">Produk</th>
                <th className="p-2 text-gray-600 font-semibold">Kategori</th>
                <th className="p-2 text-gray-600 font-semibold">Stok</th>
                <th className="p-2 text-gray-600 font-semibold">Harga</th>
                <th className="p-2 text-gray-600 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400 bg-neutral-50 rounded">
                    Belum ada data penjualan
                  </td>
                </tr>
              )}
              {sales.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? "bg-neutral-100" : "bg-neutral-50"}>
                  <td className="p-2">{(s.date?.toDate ? s.date.toDate() : new Date(s.date)).toLocaleDateString("id-ID")}</td>
                  <td className="p-2">{s.product}</td>
                  <td className="p-2">{s.category}</td>
                  <td className="p-2">{s.qty}</td>
                  <td className="p-2">Rp {s.price.toLocaleString()}</td>
                  <td className="p-2 font-semibold">Rp {(s.qty * s.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
