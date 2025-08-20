// src/pages/admin/MainPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  runTransaction,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { Product } from "@/data/products";
import {
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Loader2,
  Hourglass,
  XCircle,
  Trash2,
} from "lucide-react";

type OrderItem = {
  id: string; // product doc id
  name: string;
  image?: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
  stock?: number;
};

type OrderDoc = {
  id: string;
  orderNumber?: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: {
    street: string; city: string; state: string; zipCode: string; country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: string;
  notes?: string;
  createdAt?: any;
  updatedAt?: any;
  inventoryDeducted?: boolean; // penanda stok sudah dikurangi
};

function idr(n: number) {
  try { return n.toLocaleString("id-ID"); } catch { return String(n); }
}

function statusChipClass(status: OrderDoc["status"]) {
  switch (status) {
    case "pending": return "bg-yellow-50 text-yellow-800 border border-yellow-200";
    case "processing": return "bg-blue-50 text-blue-800 border border-blue-200";
    case "shipped": return "bg-indigo-50 text-indigo-800 border border-indigo-200";
    case "delivered": return "bg-emerald-50 text-emerald-800 border border-emerald-200";
    case "cancelled": return "bg-red-50 text-red-800 border border-red-200";
    default: return "bg-gray-50 text-gray-800 border border-gray-200";
  }
}
function paymentChipClass(status: OrderDoc["paymentStatus"]) {
  switch (status) {
    case "paid": return "bg-emerald-50 text-emerald-800 border border-emerald-200";
    case "pending": return "bg-orange-50 text-orange-800 border border-orange-200";
    case "failed": return "bg-red-50 text-red-800 border border-red-200";
    case "refunded": return "bg-slate-50 text-slate-800 border border-slate-200";
    default: return "bg-gray-50 text-gray-800 border border-gray-200";
  }
}

const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>
      <rect width='100%' height='100%' fill='#f3f4f6'/>
      <text x='50%' y='52%' text-anchor='middle' font-family='Arial' font-size='10' fill='#9ca3af'>no image</text>
    </svg>`
  );

// AUTO: kalau paymentStatus sudah 'paid', auto-deduct sekali
const AUTO_DEDUCT_ON_PAID = true;

export default function MainPage() {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<{ id: string; action: string } | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "processing" | "delivered" | "cancelled">("all");

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list: OrderDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setOrders(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ====== Stock decrement (1x saja per order) ======
  async function decrementStockOnce(order: OrderDoc) {
    await runTransaction(db, async (tx) => {
      const oRef = doc(db, "orders", order.id);
      const oSnap = await tx.get(oRef);
      if (!oSnap.exists()) throw new Error("Order not found");
      const oData = oSnap.data() as OrderDoc;

      if (oData.inventoryDeducted) return; // sudah dikurangi → skip

      for (const it of oData.items ?? []) {
        const pRef = doc(db, "products", it.id);
        const pSnap = await tx.get(pRef);
        if (!pSnap.exists()) continue;

        const data = pSnap.data() as Product & {
          stock?: number;
          sizes?: Array<{ size: string; stock?: number }>;
        };

        const sizes = Array.isArray(data.sizes) ? [...data.sizes] : [];
        if (sizes.length) {
          const idx = sizes.findIndex(
            (s) => (s.size || "").toUpperCase() === (it.size || "").toUpperCase()
          );
          if (idx >= 0) {
            const cur = Number(sizes[idx].stock ?? 0);
            sizes[idx] = { ...sizes[idx], stock: Math.max(0, cur - (it.quantity ?? 0)) };
          }
        }

        // (opsional) kurangi total stock juga
        const newStock =
          typeof data.stock === "number"
            ? Math.max(0, (data.stock ?? 0) - (it.quantity ?? 0))
            : data.stock;

        tx.update(pRef, { sizes, stock: newStock });
      }

      // tandai sudah dikurangi
      tx.update(oRef, { inventoryDeducted: true, updatedAt: serverTimestamp() });
    });
  }

  // AUTO: bila paymentStatus 'paid' & belum deducted → deduct otomatis
  useEffect(() => {
    if (!AUTO_DEDUCT_ON_PAID) return;
    const toAuto = orders.filter((o) => o.paymentStatus === "paid" && !o.inventoryDeducted);
    toAuto.forEach((o) => {
      decrementStockOnce(o).catch((e) => console.error("auto-deduct fail:", e));
    });
  }, [orders]);

  // ===== Actions =====
  const setStatus = async (order: OrderDoc, next: OrderDoc["status"]) => {
    setBusy({ id: order.id, action: next });
    try {
      // Kalau menuju 'processing' atau 'delivered' dan belum pernah deduct → deduct dulu
      if ((next === "processing" || next === "delivered") && !order.inventoryDeducted) {
        await decrementStockOnce(order);
      }
      await updateDoc(doc(db, "orders", order.id), {
        status: next,
        updatedAt: serverTimestamp(),
      });
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (order: OrderDoc) => {
    if (!window.confirm(`Hapus order #${order.orderNumber || order.id}?`)) return;
    setBusy({ id: order.id, action: "delete" });
    try {
      await deleteDoc(doc(db, "orders", order.id));
    } finally {
      setBusy(null);
    }
  };

  const filtered = useMemo(() => (filter === "all" ? orders : orders.filter((o) => o.status === filter)), [orders, filter]);

  if (loading) return <div className="p-4 md:p-6">Loading orders…</div>;

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* header + filter (responsive) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">Confirm Order</h1>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["pending", "Pending"],
              ["processing", "Processing"],
              ["delivered", "Done"],
              ["cancelled", "Cancelled"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition ${
                filter === key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              {label} <span className="ml-1 opacity-70">({counts[key]})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {filtered.length === 0 && (
          <div className="p-3 sm:p-4 border rounded-xl bg-white text-xs sm:text-sm text-gray-500">
            Belum ada order.
          </div>
        )}

        {filtered.map((o) => (
          <div key={o.id} className="p-3 sm:p-4 border rounded-xl bg-white">
            {/* HEADER (responsive stack) */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-gray-500">#{o.orderNumber || o.id}</div>
                <div className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="truncate">{o.customerName}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 flex flex-wrap items-center gap-2 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                  {o.customerEmail}
                  <span className="opacity-40">•</span>
                  <Phone className="w-3.5 h-3.5" />
                  {o.customerPhone}
                </div>
              </div>

              <div className="text-right text-xs sm:text-sm shrink-0">
                <div className={`inline-flex items-center px-2 py-0.5 rounded ${statusChipClass(o.status)}`}>
                  Status: {o.status}
                </div>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded ${paymentChipClass(o.paymentStatus)}`}>
                    Payment: {o.paymentStatus}
                  </span>
                </div>
                <div className="mt-2 font-semibold">
                  Total: <span>Rp {idr(o.total)}</span>
                </div>
                <div className="mt-1 text-[11px] sm:text-xs text-gray-500 flex items-center justify-end gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {o.createdAt?.toDate
                    ? new Date(o.createdAt.toDate()).toLocaleString()
                    : o.createdAt
                    ? String(o.createdAt)
                    : "-"}
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="mt-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg text-xs sm:text-sm">
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="truncate">{o.shippingAddress?.street}</div>
                  <div className="truncate">
                    {o.shippingAddress?.city}, {o.shippingAddress?.state} {o.shippingAddress?.zipCode}
                  </div>
                  <div className="truncate">{o.shippingAddress?.country}</div>
                </div>
              </div>
            </div>

            {/* ITEMS */}
            <div className="mt-3 sm:mt-4 border-t pt-2.5 sm:pt-3">
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Package className="w-4 h-4" /> Items
              </div>

              <div className="divide-y">
                {o.items?.map((it, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <img
                        src={it.image || FALLBACK_IMG}
                        onError={(e) => ((e.currentTarget.src = FALLBACK_IMG))}
                        alt={it.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border bg-white"
                      />
                      <div className="min-w-0">
                        <div className="font-medium truncate">{it.name}</div>
                        <div className="text-gray-500 text-[11px] sm:text-xs">
                          {it.size ? `Size: ${it.size}` : ""} {it.color ? `• ${it.color}` : ""} • qty {it.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div>Rp {idr((it.price ?? 0) * (it.quantity ?? 0))}</div>
                      {typeof it.price === "number" && (
                        <div className="text-[10px] sm:text-[11px] text-gray-500">Rp {idr(it.price)} / item</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS (stack di mobile) */}
            <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <button
                onClick={() => setStatus(o, "pending")}
                disabled={busy?.id === o.id}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-xs sm:text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1"
                title="Set Pending"
              >
                <Hourglass className="w-4 h-4" />
                {busy?.id === o.id && busy?.action === "pending" ? "Updating…" : "Pending"}
              </button>

              <button
                onClick={() => setStatus(o, "processing")}
                disabled={busy?.id === o.id}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-xs sm:text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1"
                title="Set Processing (deduct stock once)"
              >
                {busy?.id === o.id && busy?.action === "processing" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Loader2 className="w-4 h-4" />
                )}
                {o.inventoryDeducted ? "Processing" : "Process"}
              </button>

              <button
                onClick={() => setStatus(o, "delivered")}
                disabled={busy?.id === o.id}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-xs sm:text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1"
                title="Set Delivered / Done"
              >
                <CheckCircle className="w-4 h-4" />
                {busy?.id === o.id && busy?.action === "delivered" ? "Updating…" : "Done"}
              </button>

              <button
                onClick={() => setStatus(o, "cancelled")}
                disabled={busy?.id === o.id}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-xs sm:text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1 text-red-600"
                title="Cancel Order"
              >
                <XCircle className="w-4 h-4" />
                {busy?.id === o.id && busy?.action === "cancelled" ? "Updating…" : "Cancel"}
              </button>

              <button
                onClick={() => handleDelete(o)}
                disabled={busy?.id === o.id}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-xs sm:text-sm disabled:opacity-50 inline-flex items-center justify-center gap-1 text-red-700 col-span-2 sm:col-span-1"
                title="Delete Order"
              >
                <Trash2 className="w-4 h-4" />
                {busy?.id === o.id && busy?.action === "delete" ? "Deleting…" : "Delete"}
              </button>
            </div>

            <div className="mt-2 text-[10px] sm:text-[11px] text-gray-500">
              {o.inventoryDeducted
                ? "Stock for this order has been deducted."
                : "Stock not deducted yet. Process/Done will deduct automatically."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
