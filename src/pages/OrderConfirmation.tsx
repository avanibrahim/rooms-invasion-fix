import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "../hooks/use-toast";
import { useCartStore } from "../store/cartStore";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const [order, setOrder] = useState(null);

  const search = useLocation().search;
  const orderQuery = new URLSearchParams(search).get("order");

  useEffect(() => {
    const raw = sessionStorage.getItem("lastOrder");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setOrder(parsed);
      } catch (e) {
        console.error("Bad order payload", e);
      }
    }
  }, []);

  const waMessage = useMemo(() => (order ? order.waMessage : ""), [order]);
  const WA_NUMBER = order?.adminWaNumber || "6285166369467";
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const handleConfirm = () => {
    if (!order) return;

    // buka WA
    window.open(waUrl, "_blank", "noopener");

    // kosongkan cart + toast + arahkan ke home
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order dikirim ke admin ✅",
        description: "Silakan lanjutkan konfirmasi di WhatsApp.",
        variant: "destructive",
      });
      navigate("/");
    }, 600);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-semibold mb-2">Order Confirmation</h1>
          <p className="text-gray-600 mb-6">Tidak ada data pesanan ditemukan.</p>
          <button
            onClick={() => navigate("/checkout")}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Kembali ke Checkout
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
  <Header />
 {/* === Full-bleed banner, nempel ke navbar & tepi layar === */}
<header className="relative w-full">
  {/* wadah tinggi banner (samain dengan sebelumnya) */}
  <div className="relative h-32 md:h-44 lg:h-56 w-full">

    {/* gambar sebagai background, tidak pakai <img/> */}
    <div
      className="
        absolute inset-0
        bg-[url('/image/tes.jpg')]
        bg-no-repeat bg-cover
        bg-[position:center_38%]   /* geser fokus crop: naik-turun sesuaikan angka 0–100% */
      "
      aria-hidden
    />

    {/* gelap + blur di atas gambar */}
    <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" aria-hidden />

    {/* konten teks di atas */}
    <div className="relative z-10 flex items-center h-full">
      <div className="max-w-5xl mx-auto w-full px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow">
          Order Confirmation
        </h1>
        <p className="text-white/90 text-xl md:text-2xl mt-2">
          Order Number: <span className="font-mono">{order.orderNumber}</span>
          {orderQuery && orderQuery !== order.orderNumber ? (
            <span className="ml-2 text-xs text-orange-300">(query mismatch)</span>
          ) : null}
        </p>
      </div>
    </div>
  </div>
</header>


  {/* === Konten utama tetap center, tidak kepotong === */}
  <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
    {/* Informasi Customer */}
    <section className="rounded-2xl border p-5 bg-white">
      <h2 className="text-lg font-semibold mb-3">Informasi Customer</h2>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">Nama</span>
          <div>{order.formData.firstName} {order.formData.lastName}</div>
        </div>
        <div>
          <span className="text-gray-500">Email</span>
          <div>{order.formData.email}</div>
        </div>
        <div>
          <span className="text-gray-500">Phone</span>
          <div>{order.formData.phone}</div>
        </div>
        <div className="sm:col-span-2">
          <span className="text-gray-500">Alamat</span>
          <div>{order.formData.address}</div>
          <div>{order.formData.city}, {order.formData.province} {order.formData.postalCode}</div>
          <div>{order.formData.country}</div>
        </div>
      </div>
    </section>

    {/* Item Pesanan */}
    <section className="rounded-2xl border p-5 bg-white">
      <h2 className="text-lg font-semibold mb-3">Item Pesanan</h2>
      <ul className="divide-y">
        {order.items.map((it, idx) => (
          <li key={it.id ?? idx} className="py-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              {it.image ? (
                <img src={it.image} alt={it.name} className="w-12 h-12 object-cover rounded-lg" />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-lg" />
              )}
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-gray-500 text-xs">
                  {it.size} • {it.color} • x{it.quantity}
                </div>
              </div>
            </div>
            <div className="font-semibold">Rp {(it.price * it.quantity).toLocaleString("id-ID")}</div>
          </li>
        ))}
      </ul>
    </section>

    {/* Ringkasan Pembayaran */}
    <section className="rounded-2xl border p-5 bg-white">
      <h2 className="text-lg font-semibold mb-3">Ringkasan Pembayaran</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Metode Pengiriman</span>
          <span>{order.shippingMethodText}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Ongkir</span>
          <span>Rp {order.shippingCost.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Pajak (10%)</span>
          <span>Rp {order.tax.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t pt-2">
          <span>Total</span>
          <span>Rp {order.totalAmount.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span>Metode Pembayaran</span>
          <span>{order.paymentMethodText}</span>
        </div>
      </div>
    </section>

    {/* Tombol Konfirmasi */}
    <div className="pt-0">
      <p className="mb-3 text-[11px] text-gray-500">
        *Pastikan WhatsApp Anda aktif. Pesan terisi otomatis sesuai pesanan.
      </p>
      <button
        onClick={handleConfirm}
        className="w-full inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 font-medium"
      >
        Confirm Order
      </button>
    </div>
  </main>

  <Footer />
</div>

  );
}
