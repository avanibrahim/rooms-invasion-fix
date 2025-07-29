import React from "react";
import { Product } from "@/data/products";

interface Props {
  form: Partial<Product>;
  editing: Product | null;
  categories: string[];
  handleChange: (key: keyof Product, value: any) => void;
  updateSize: (i: number, field: "size" | "stock", val: any) => void;
  addSizeRow: () => void;
  saveProduct: () => void;
  cancelEdit: () => void;
  addProduct: () => void;
}

const ProductForm: React.FC<Props> = ({
  form, editing, categories, handleChange, updateSize, addSizeRow,
  saveProduct, cancelEdit, addProduct
}) => (
  <section className="mb-8 border rounded-2xl bg-white/80 shadow-md p-6 space-y-4">
    <h2 className="font-semibold text-lg flex items-center gap-2">
      {editing ? (
        <>
          <svg className="inline w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-1.5A2.5 2.5 0 0121 9.5V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h7.5a2.5 2.5 0 012.036 1.268z" /></svg>
          Edit Product
        </>
      ) : (
        <>
          <svg className="inline w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add New Product
        </>
      )}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Name</label>
        <input
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
          value={form.name || ""}
          onChange={e => handleChange("name", e.target.value)}
          placeholder="Name"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Category</label>
        <select
          className="w-full p-2 border rounded bg-white focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
          value={form.category || ""}
          onChange={e => handleChange("category", e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Brand</label>
        <input
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
          value={form.brand || ""}
          onChange={e => handleChange("brand", e.target.value)}
          placeholder="Brand"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Price</label>
        <input
          type="number"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
          value={form.price ?? ""}
          onChange={e => handleChange("price", e.target.value === "" ? undefined : +e.target.value)}
          placeholder="Price"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">Original Price</label>
        <input
          type="number"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
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
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
          value={form.stock ?? ""}
          onChange={e => handleChange("stock", e.target.value === "" ? undefined : +e.target.value)}
          placeholder="Stock"
        />
      </div>
    </div>
    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-600">Description</label>
      <textarea
        className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
        rows={3}
        value={form.description || ""}
        onChange={e => handleChange("description", e.target.value)}
        placeholder="Description"
      />
    </div>
    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-600">
        Images <span className="text-gray-400 text-xs">(comma-separated URLs)</span>
      </label>
      <input
        className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
        value={(form.images || []).join(", ")}
        onChange={e =>
          handleChange("images", e.target.value.split(",").map(s => s.trim()))
        }
        placeholder="url1, url2"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {(form.images || []).filter(Boolean).slice(0, 3).map((url, idx) => (
          <img key={idx} src={url} alt="" className="w-16 h-16 rounded object-cover border" />
        ))}
      </div>
    </div>
    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-600">Sizes & Stock</label>
      <div className="space-y-2">
        {(form.sizes || []).map((s: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              className="w-1/2 p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
              placeholder="Size"
              value={s.size}
              onChange={e => updateSize(idx, "size", e.target.value)}
            />
            <input
              type="number"
              className="w-1/2 p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
              placeholder="Stock"
              value={s.stock}
              onChange={e => updateSize(idx, "stock", e.target.value)}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        onClick={addSizeRow}
      >
        + Add Size
      </button>
    </div>
    <div className="pt-2 flex gap-2">
      {editing ? (
        <>
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
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
          className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          onClick={addProduct}
        >
          Add Product
        </button>
      )}
    </div>
  </section>
);

export default ProductForm;
