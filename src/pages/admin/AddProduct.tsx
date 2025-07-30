import React from "react";
import { toast } from "@/components/ui/use-toast";
import { Image as ImageIcon, X, PlusSquare, Edit2, FilePlus } from "lucide-react";

type SizeType = { size: string; stock: number };

interface AddProductProps {
  form: any;
  handleChange: (key: string, value: any) => void;
  addProduct: () => Promise<void>;
  editing: any;
  saveProduct: () => Promise<void>;
  cancelEdit: () => void;
  updateSize: (i: number, field: "size" | "stock", val: any) => void;
  addSizeRow: () => void;
  categories: string[];
}

const AddProduct: React.FC<AddProductProps> = ({
  form,
  handleChange,
  addProduct,
  editing,
  saveProduct,
  cancelEdit,
  updateSize,
  addSizeRow,
  categories,
}) => {
  // LOGIKA TIDAK DIUBAH!
  const showSizes = !["accessories", "accesories", "shorts"].includes(
    (form.category || "").toLowerCase()
  );

  // Toast UI pake Shadcn, hanya variant "default" atau "destructive"
  const showToast = (
    variant: "default" | "destructive",
    title: string,
    desc: string
  ) => {
    toast({
      title,
      description: desc,
      variant,
      duration: 3500,
    });
  };

  // Handler ADD/EDIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      try {
        await saveProduct();
        showToast("default", "Produk berhasil diedit!", "Data produk sudah diperbarui.");
      } catch (err) {
        showToast("destructive", "Gagal edit produk!", "Terjadi error saat menyimpan data.");
      }
    } else {
      try {
        await addProduct();
        showToast("default", "Produk berhasil ditambahkan!", "Produk baru telah masuk daftar.");
      } catch (err) {
        showToast("destructive", "Gagal menambah produk!", "Terjadi error saat menambah data.");
      }
    }
  };

  return (
    <div className="max-w-full px-2 sm:px-6 md:px-0 py-0">
        {/* HEADER */}
        <header className="w-full px-4 py-3 z-20 flex items-center">
          <div className="flex items-center gap-3">
            <FilePlus className="w-7 h-7 text-gray-100" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Product Management</span>
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
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Product name"
          />
          <label className="text-xs text-gray-700 mt-2">Category</label>
          <select
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm bg-white"
            value={form.category || ""}
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
            value={form.brand || ""}
            onChange={(e) => handleChange("brand", e.target.value)}
            placeholder="Issue"
          />
          <label className="text-xs text-gray-700 mt-2">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
            rows={6}
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Product description"
          />
          <p className="mt-2 text-[11px] text-gray-500 leading-snug">
            Click to Copy Example:<br />
            <button
              type="button"
              className="underline text-cyan-600 hover:text-gray-900 whitespace-pre-line text-left"
              style={{ textAlign: "left" }}
              onClick={() =>
                handleChange(
                  "description",
                  [
                    "•⁠⁠100% Australian cotton • 250 GSM⁠",
                    "• ⁠⁠Boxy Fit",
                    "• Oil Based Screen Print Decoration⁠",
                    "• ⁠⁠Rooms Woven Label",
                    "• ⁠⁠Finest Quality",
                    "• ⁠⁠Made in Indonesia",
                  ].join("\n")
                )
              }
            >
              •⁠⁠100% Australian cotton • 250 GSM⁠{"\n"}
              • ⁠⁠Boxy Fit{"\n"}
              • Oil Based Screen Print Decoration⁠{"\n"}
              • ⁠⁠Rooms Woven Label{"\n"}
              • ⁠⁠Finest Quality{"\n"}
              • ⁠⁠Made in Indonesia
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
                value={form.price ?? ""}
                onChange={(e) =>
                  handleChange(
                    "price",
                    e.target.value === "" ? undefined : +e.target.value
                  )
                }
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <label className="text-xs text-gray-700">Stock (Total)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                value={form.stock ?? ""}
                onChange={(e) =>
                  handleChange(
                    "stock",
                    e.target.value === "" ? undefined : +e.target.value
                  )
                }
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          {/* Images */}
          <label className="text-xs text-gray-700 mt-2 flex items-center gap-1">
            <ImageIcon className="w-4 h-4 text-gray-400" />
            Images
            <span className="text-gray-400 text-xs">(comma separated)</span>
          </label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
            value={(form.images || []).join(", ")}
            onChange={(e) =>
              handleChange(
                "images",
                e.target.value.split(",").map((s: string) => s.trim())
              )
            }
            placeholder="URL 1, URL 2, ..."
          />
          <div className="flex gap-2 mt-1">
            {(form.images || [])
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
                        (form.images || []).filter(
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
                {(form.sizes || []).length === 0 && (
                  <div className="text-xs text-gray-400 mb-2">
                    Add at least one size (e.g. S, M, L, XL)
                  </div>
                )}
                {(form.sizes || []).map((s: SizeType, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white/90"
                  >
                    <div className="flex flex-col sm:flex-row flex-1 gap-2">
                      <input
                        className="border border-gray-300 rounded-md py-2 px-2 text-sm w-full sm:w-[19rem]"
                        placeholder="Size (e.g. S)"
                        value={s.size}
                        onChange={(e) =>
                          updateSize(idx, "size", e.target.value)
                        }
                        autoComplete="off"
                      />
                      <input
                        type="number"
                        className="border border-gray-300 rounded-md py-2 px-2 text-sm w-full sm:w-[19rem]"
                        placeholder="Stock"
                        value={s.stock}
                        onChange={(e) =>
                          updateSize(idx, "stock", e.target.value)
                        }
                        min="0"
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
                          (form.sizes || []).filter((_, i) => i !== idx)
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
                  NOTE!<br />
                  Isi 0 (Nol) Stock dari size yang Sold, Sesuaikan Total Stock dengan jumlah size yang ada.<br />
                  Contoh: Total Stock 10, Size S 5, Size M 5, Size L 0, Size XL 0, maka Total Stock = 5 + 5 = 10.<br />
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
