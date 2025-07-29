import React from "react";
import { Product } from "@/data/products";

interface Props {
  products: Product[];
  page: number;
  perPage: number;
  startEdit: (p: Product) => void;
  removeProduct: (id: string) => void;
  filteredProducts: Product[];
  setPage: (p: number) => void;
}

const ProductTable: React.FC<Props> = ({
  products, page, perPage, startEdit, removeProduct, filteredProducts, setPage
}) => (
  <section className="overflow-x-auto rounded-2xl shadow-lg bg-white/90">
    <table className="min-w-[650px] w-full text-[15px]">
      <thead className="sticky top-0 z-10">
        <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 shadow-sm">
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
                className={`transition ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50/60'} hover:bg-blue-100/70`}
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
                    className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-blue-50 text-blue-700 hover:text-blue-900 transition"
                    onClick={() => startEdit(p)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-1.5A2.5 2.5 0 0121 9.5V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h7.5a2.5 2.5 0 012.036 1.268z" /></svg>
                  </button>
                  <button
                    title="Delete"
                    className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-red-50 text-red-600 hover:text-red-800 transition"
                    onClick={() => removeProduct(p.id)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center py-8 text-gray-400 font-medium bg-white">
              No products found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </section>
);

export default ProductTable;
