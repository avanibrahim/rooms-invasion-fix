import React from "react";
import { toast } from "@/components/ui/use-toast";
import { Image as ImageIcon, X, PlusSquare, FilePlus } from "lucide-react";
import UploadProducts from "@/components/UploadProducts";

import { db, auth } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type SizeType = { size: string | undefined; stock: string | number | undefined };

interface AddProductProps {
  form: any;
  handleChange: (key: string, value: any) => void;
  // prop lama biarin ada biar kompatibel, tapi kita tidak pakai:
  addProduct: () => Promise<void>;
  editing: any;
  saveProduct: () => Promise<void>;
  cancelEdit: () => void;
  updateSize: (i: number, field: "size" | "stock", val: any) => void;
  addSizeRow: () => void;
  categories: string[];
}

/** Util parse */
const N = (v: any) => { const n = Number(v); return Number.isFinite(n) ? n : NaN; };
const S = (v: any) => String(v ?? "").trim();

/** Service: tulis 1x dokumen ke /products */
async function addProductFromForm(form: any) {
  if (!auth.currentUser) {
    const err: any = new Error("Belum login");
    err.code = "auth/no-user";
    throw err;
  }

  const sizes = (form?.sizes ?? [])
    .map((s: any) => ({ size: S(s?.size), stock: N(s?.stock) }))
    .filter((s: any) => s.size);

  const stockParsed = N(form?.stock);
  const hasStockInput =
    !(form?.stock === undefined || form?.stock === null || form?.stock === "");
  const stockFromSizes = sizes.reduce(
    (a: number, b: any) => a + (Number.isFinite(b.stock) ? b.stock : 0),
    0
  );
  const finalStock =
    hasStockInput && Number.isFinite(stockParsed) ? stockParsed : stockFromSizes;

  const priceParsed = N(form?.price);

  await addDoc(collection(db, "products"), {
    name: S(form?.name),
    brand: S(form?.brand),
    description: S(form?.description),
    category: S(form?.category),
    price: Number.isFinite(priceParsed) ? priceParsed : 0,
    stock: finalStock,
    sizes,
    images: Array.isArray(form?.images) ? form.images.filter(Boolean) : [],
    published: true, // agar tampil di storefront
    createdBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

const AddProduct: React.FC<AddProductProps> = ({
  form,
  handleChange,
  addProduct, // tidak dipakai
  editing,
  saveProduct,
  cancelEdit,
  updateSize,
  addSizeRow,
  categories,
}) => {
  // Kategori yang TIDAK pakai sizes
  const showSizes = !["accessories", "accesories", "shorts"].includes(
    (form?.category || "").toLowerCase()
  );

  const showToast = (
    variant: "default" | "destructive",
    title: string,
    desc: string
  ) => toast({ title, description: desc, variant, duration: 3500 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      try {
        await saveProduct();
        showToast("default", "Produk berhasil diedit!", "Data produk sudah diperbarui.");
      } catch (err) {
        console.error("saveProduct error:", (err as any)?.code, (err as any)?.message);
        showToast("destructive", "Gagal edit produk!", "Terjadi error saat menyimpan data.");
      }
    } else {
      try {
        await addProductFromForm(form);
        showToast("default", "Produk berhasil ditambahkan!", "Produk baru telah masuk daftar.");
      } catch (err) {
        const code = (err as any)?.code as string | undefined;
        console.error("addProduct error:", code, (err as any)?.message);
        if (code === "permission-denied") {
          showToast(
            "destructive",
            "Tidak punya izin",
            "Akun ini belum diizinkan menulis ke Firestore. Pastikan login admin & rules benar."
          );
        } else if (code === "auth/no-user") {
          showToast("destructive", "Belum login", "Silakan login terlebih dahulu.");
        } else {
          showToast("destructive", "Gagal menambah produk!", "Terjadi error saat menambah data.");
        }
      }
    }
  };

  return (
    <div className="max-w-full px-2 sm:px-6 md:px-0 py-0">
      {/* HEADER */}
      <header className="w-full px-4 py-3 z-20 flex items-center">
        <div className="flex items-center gap-3">
          <FilePlus className="w-7 h-7 text-gray-100" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            Product Management
          </span>
        </div>
      </header>

      <div className="mb-8 border border-gray-200 p-4 rounded-xl bg-white max-w-full w-full shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-semibold text-base text-gray-800 tracking-tight">
            {editing ? "Edit Product" : "Add Product"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Form Kiri */}
          <div className="flex flex-col gap-3">
            <label className="text-xs text-gray-700">Name</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              value={form?.name ?? ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Product name"
            />

            <label className="text-xs text-gray-700 mt-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm bg-white"
              value={form?.category ?? ""}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className="text-xs text-gray-700 mt-2">Issue</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
              value={form?.brand ?? ""}
              onChange={(e) => handleChange("brand", e.target.value)}
              placeholder="Issue"
            />

            <label className="text-xs text-gray-700 mt-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
              rows={6}
              value={form?.description ?? ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Product description"
            />

            <p className="mt-2 text-[11px] text-gray-500 leading-snug">
              Click to Copy Example:
              <br />
              <button
                type="button"
                className="underline text-cyan-600 hover:text-gray-900 whitespace-pre-line text-left"
                style={{ textAlign: "left" }}
                onClick={() =>
                  handleChange(
                    "description",
                    [
                      "•\u2060100% Australian cotton • 250 GSM\u2060",
                      "•\u2060 Boxy Fit",
                      "• Oil Based Screen Print Decoration\u2060",
                      "•\u2060 Rooms Woven Label",
                      "•\u2060 Finest Quality",
                      "•\u2060 Made in Indonesia",
                    ].join("\n")
                  )
                }
              >
                •\u2060100% Australian cotton • 250 GSM\u2060{"\n"}•\u2060 Boxy Fit{"\n"}• Oil
                Based Screen Print Decoration\u2060{"\n"}•\u2060 Rooms Woven Label{"\n"}•\u2060
                Finest Quality{"\n"}•\u2060 Made in Indonesia
              </button>
            </p>
          </div>

          {/* Form Kanan */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-700">Price</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                  value={form?.price ?? ""}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="0"
                  min={0}
                  inputMode="decimal"
                />
              </div>
              <div>
                <label className="text-xs text-gray-700">Stock (Total)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                  value={form?.stock ?? ""}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  placeholder="0"
                  min={0}
                  inputMode="numeric"
                />
              </div>
            </div>

            {/* Images */}
            <label className="text-xs text-gray-700 mt-2 flex items-center gap-1">
              <ImageIcon className="w-4 h-4 text-gray-400" />
              Images
              <span className="text-gray-400 text-xs">(comma separated)</span>
            </label>

            <UploadProducts
              images={form?.images ?? []}
              setImages={(imgs) => handleChange("images", imgs)}
            />

            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm mt-2"
              value={(Array.isArray(form?.images) ? form.images : []).join(", ")}
              onChange={(e) =>
                handleChange(
                  "images",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="URL 1, URL 2, ..."
            />

            <div className="flex gap-2 mt-1">
              {(Array.isArray(form?.images) ? form.images : [])
                .filter(Boolean)
                .slice(0, 3)
                .map((url: string, idx: number) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt=""
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-white text-gray-700 p-0.5 rounded-full border hover:bg-red-100"
                      title="Remove"
                      onClick={() =>
                        handleChange(
                          "images",
                          (Array.isArray(form?.images) ? form.images : []).filter(
                            (_: any, i: number) => i !== idx
                          )
                        )
                      }
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
            </div>

            {/* Sizes */}
            {showSizes && (
              <div>
                <label className="text-xs text-gray-700 mt-2">Sizes & Stock</label>
                <div className="space-y-2">
                  {(form?.sizes ?? []).length === 0 && (
                    <div className="text-xs text-gray-400 mb-2">
                      Add at least one size (e.g. S, M, L, XL)
                    </div>
                  )}

                  {(form?.sizes ?? []).map((s: SizeType, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white/90"
                    >
                      <div className="flex flex-col sm:flex-row flex-1 gap-2">
                        <input
                          className="border border-gray-300 rounded-md py-2 px-2 text-sm w-full sm:w-[19rem]"
                          placeholder="Size (e.g. S)"
                          value={s?.size ?? ""}
                          onChange={(e) => updateSize(idx, "size", e.target.value)}
                          autoComplete="off"
                        />
                        <input
                          type="number"
                          className="border border-gray-300 rounded-md py-2 px-2 text-sm w-full sm:w-[19rem]"
                          placeholder="Stock"
                          value={s?.stock ?? ""}
                          onChange={(e) => updateSize(idx, "stock", e.target.value)}
                          min={0}
                          autoComplete="off"
                          inputMode="numeric"
                        />
                      </div>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Remove size"
                        onClick={() =>
                          handleChange(
                            "sizes",
                            (form?.sizes ?? []).filter((_: any, i: number) => i !== idx)
                          )
                        }
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="mt-2 px-3 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-md hover:bg-cyan-200 flex items-center gap-1 transition"
                    onClick={addSizeRow}
                  >
                    <PlusSquare size={15} />
                    Add Size
                  </button>

                  <p className="text-[12px] text-gray-500 mt-3 leading-relaxed text-justify">
                    NOTE!
                    <br />
                    Isi 0 (Nol) Stock dari size yang Sold, Sesuaikan Total Stock dengan jumlah
                    size yang ada.
                    <br />
                    Contoh: Total Stock 10, Size S 5, Size M 5, Size L 0, Size XL 0, maka
                    Total Stock = 5 + 5 = 10.
                    <br />
                    MAKSIMAL PER FOTO 2MB!
                    <br />
                    Hubungi Developer Jika ada error pada saat upload gambar atau menambah
                    produk.
                    <br />
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-between items-center pt-6">
            <button
              className="px-5 py-2 bg-cyan-600 text-white font-semibold rounded-md shadow hover:bg-cyan-700 transition"
              type="submit"
            >
              {editing ? "Save" : "Add Product"}
            </button>
            <button
              className="px-5 py-2 bg-gray-100 text-gray-600 rounded-md border shadow hover:bg-gray-200 transition"
              type="button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
