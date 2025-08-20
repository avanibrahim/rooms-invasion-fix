import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useOrderStore } from "@/store/orderStore";
import { Shield, Truck, CreditCard } from "lucide-react";

function formatIDR(n: number) {
  try {
    return n.toLocaleString("id-ID");
  } catch {
    return String(n);
  }
}

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    orders,
    loading,
    fetchOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
    addTrackingNumber,
  } = useOrderStore();

  // ambil order dari store
  const order = useMemo(() => (id ? getOrderById(id) : undefined), [id, getOrderById, orders]);

  // kalau direct-visit & store kosong → isi mock dengan fetchOrders()
  useEffect(() => {
    if (!order && !loading) {
      fetchOrders?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, loading]);

  const [addingTrack, setAddingTrack] = useState(false);

  const handleMarkProcessing = async () => {
    if (!id) return;
    await updateOrderStatus(id, "processing");
  };

  const handleMarkShipped = async () => {
    if (!id) return;
    const tn = window.prompt("Masukkan tracking number:");
    if (!tn) return;
    setAddingTrack(true);
    try {
      await addTrackingNumber(id, tn);
    } finally {
      setAddingTrack(false);
    }
  };

  const handleMarkDelivered = async () => {
    if (!id) return;
    await updateOrderStatus(id, "delivered");
  };

  const handleCancel = async () => {
    if (!id) return;
    if (!window.confirm("Yakin batalkan pesanan ini?")) return;
    await updateOrderStatus(id, "cancelled");
  };

  const handleMarkPaid = async () => {
    if (!id) return;
    await updatePaymentStatus(id, "paid");
  };

  const handleMarkFailed = async () => {
    if (!id) return;
    await updatePaymentStatus(id, "failed");
  };

  const handleRefund = async () => {
    if (!id) return;
    await updatePaymentStatus(id, "refunded");
  };

  if (!order) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Link to="/admin/orders" className="text-sm text-blue-600 hover:underline">
            ← Back to Orders
          </Link>
        </div>
        <h1 className="text-xl font-semibold">Order Not Found</h1>
        <p className="text-sm text-gray-500 mt-1">ID: {id}</p>
      </div>
    );
  }

  const {
    customerEmail,
    customerName,
    customerPhone,
    shippingAddress,
    items,
    subtotal,
    shipping,
    tax,
    total,
    status,
    paymentStatus,
    paymentMethod,
    trackingNumber,
    createdAt,
    updatedAt,
    notes,
  } = order;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-1">
            <Link to="/admin/orders" className="text-sm text-blue-600 hover:underline">
              ← Back to Orders
            </Link>
          </div>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <div className="text-xs text-gray-500 mt-1">
            Created: {new Date(createdAt).toLocaleString()} • Updated: {new Date(updatedAt).toLocaleString()}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded bg-gray-100 border">Status: {status}</span>
          <span className="text-xs px-2 py-1 rounded bg-gray-100 border">Payment: {paymentStatus}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* left */}
        <div className="lg:col-span-2 space-y-4">
          {/* Customer */}
          <div className="p-4 border rounded-xl">
            <h2 className="font-semibold mb-2">Customer</h2>
            <div className="text-sm text-gray-700">
              <div className="font-medium">{customerName || "-"}</div>
              <div>{customerEmail || "-"}</div>
              <div>{customerPhone || "-"}</div>
            </div>
          </div>

          {/* Shipping */}
          <div className="p-4 border rounded-xl">
            <h2 className="font-semibold mb-2">Shipping</h2>
            <div className="text-sm text-gray-700">
              <div>{shippingAddress?.street || "-"}</div>
              <div>
                {shippingAddress?.city || "-"},{" "}
                {shippingAddress?.state || "-"} {shippingAddress?.zipCode || "-"}
              </div>
              <div>{shippingAddress?.country || "-"}</div>
              <div className="mt-2 text-xs text-gray-500">
                <Truck className="inline w-4 h-4 mr-1" />
                {trackingNumber ? (
                  <>
                    Tracking: <span className="font-medium">{trackingNumber}</span>
                  </>
                ) : (
                  "No tracking number"
                )}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="p-4 border rounded-xl">
            <h2 className="font-semibold mb-3">Items</h2>
            <div className="divide-y">
              {items.map((it, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-sm">
                  <div className="min-w-0 pr-2">
                    <div className="font-medium truncate">{it.name}</div>
                    <div className="text-gray-500 text-xs">
                      {it.size} • {it.color} • qty {it.quantity}
                    </div>
                  </div>
                  <div className="text-right">
                    Rp {formatIDR(it.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {notes && (
            <div className="p-4 border rounded-xl">
              <h2 className="font-semibold mb-2">Notes</h2>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">{notes}</div>
            </div>
          )}
        </div>

        {/* right */}
        <div className="space-y-4">
          {/* Payment & totals */}
          <div className="p-4 border rounded-xl">
            <h2 className="font-semibold mb-2">Payment</h2>
            <div className="text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Method: <span className="font-medium">{paymentMethod}</span>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp {formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Rp {formatIDR(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Rp {formatIDR(tax)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>Rp {formatIDR(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border rounded-xl space-y-3">
            <h2 className="font-semibold">Actions</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleMarkProcessing}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
              >
                Mark Processing
              </button>

              <button
                onClick={handleMarkShipped}
                disabled={addingTrack}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm disabled:opacity-50"
              >
                {addingTrack ? "Saving..." : "Mark Shipped + Tracking"}
              </button>

              <button
                onClick={handleMarkDelivered}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
              >
                Mark Delivered
              </button>

              <button
                onClick={handleCancel}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm text-red-600"
              >
                Cancel Order
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={handleMarkPaid}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
              >
                Set Paid
              </button>
              <button
                onClick={handleMarkFailed}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
              >
                Set Failed
              </button>
              <button
                onClick={handleRefund}
                className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
              >
                Refund
              </button>
            </div>

            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <Shield className="inline w-4 h-4 mr-1" />
              Semua perubahan disimpan di store (mock/persist). Integrasi ke API tinggal ganti action di{' '}
              <code>orderStore.ts</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
