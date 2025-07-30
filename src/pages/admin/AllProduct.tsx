import React, { useState } from 'react';
import { Trash2, Edit, Search, X, ChevronsRight, ChevronsLeft} from "lucide-react";


const AllProducts = ({
  products,
  search,
  setSearch,
  filteredProducts,
  page,
  setPage,
  perPage,
  startEdit,
  removeProduct
}: {
  products: any[];
  search: string;
  setSearch: (v: string) => void;
  filteredProducts: any[];
  page: number;
  setPage: (v: number) => void;
  perPage: number;
  startEdit: (p: any) => void;
  removeProduct: (id: string) => void;
}) => {
  // State untuk modal preview gambar
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  return (
    <>

      {/* Modal Preview */}
      {previewImg && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setPreviewImg(null)}>
          <img
            src={previewImg}
            alt="Preview"
            className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white object-contain transition"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-6 text-white bg-black/50 rounded-full p-2 text-2xl hover:bg-black/80"
            onClick={() => setPreviewImg(null)}
          >✕</button>
        </div>
      )}


      {/* Search */}
      <div className="mb-6">
        <div
            className="
            relative flex w-full
            transition-all
            duration-200
            ease-in-out
            "
        >
            {/* ICON SEARCH */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black pointer-events-none z-10">
            <Search size={20} />
            </span>
            {/* INPUT */}
            <input
            type="text"
            className="
                w-full py-3 pl-12 pr-12
                rounded-2xl
                border border-white/40
                bg-white/40
                backdrop-blur-xl
                shadow-xl
                text-gray-900 placeholder-gray-400
                transition-all
                duration-300
                outline-none
                ring-0
                focus:border-gray-400/70
                focus:ring-4 focus:ring-gray-200/30
                focus:bg-white/70
            "
            placeholder="Search by name, category, or brand..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
                WebkitBackdropFilter: 'blur(16px)',
                backdropFilter: 'blur(16px)',
            }}
            />
            {/* ICON CLEAR */}
            {search && (
            <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 rounded-full bg-white/90 hover:bg-gray-200 transition shadow"
                onClick={() => setSearch('')}
                tabIndex={0}
                aria-label="Clear search"
                type="button"
            >
                <X size={18} />
            </button>
            )}
        </div>
        </div>

      {/* Pagination */}
      {filteredProducts.length > perPage && (
  <div className="flex justify-center md:justify-start items-center gap-1 py-4 flex-wrap">
    <button
      className={`px-3 py-1 rounded-lg border text-base flex items-center justify-center ${
        page === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-50 text-gray-700"
      }`}
      onClick={() => setPage(Math.max(1, page - 1))}
      disabled={page === 1}
      aria-label="Previous page"
    >
      <ChevronsLeft className="w-5 h-5" />
    </button>
    {Array.from(
      { length: Math.ceil(filteredProducts.length / perPage) },
      (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded-lg border font-semibold text-base ${
            page === i + 1
              ? "bg-gray-600 text-white"
              : "bg-white hover:bg-gray-50 text-gray-700"
          }`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      )
    )}
    <button
      className={`px-3 py-1 rounded-lg border text-base flex items-center justify-center ${
        page === Math.ceil(filteredProducts.length / perPage)
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-50 text-gray-700"
      }`}
      onClick={() =>
        setPage(Math.min(Math.ceil(filteredProducts.length / perPage), page + 1))
      }
      disabled={page === Math.ceil(filteredProducts.length / perPage)}
      aria-label="Next page"
    >
      <ChevronsRight className="w-5 h-5" />
    </button>
  </div>
)}


      {/* Produk Table (Desktop) */}
      <div className="w-full">
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white/90">
            <table className="min-w-[850px] w-full text-base">
                <thead className="sticky top-0 z-10">
                <tr className="bg-gray-500 text-gray-200">
                    <th className="px-4 py-3 text-left border-r border-gray-300" style={{ width: 68 }}>Image</th>
                    <th className="px-4 py-3 text-left border-r border-gray-300">Name</th>
                    <th className="px-4 py-3 text-left border-r border-gray-300">Category</th>
                    <th className="px-4 py-3 text-left border-r border-gray-300">Issue</th>
                    <th className="px-4 py-3 text-left border-r border-gray-300" style={{ minWidth: 110 }}>Price</th>
                    <th className="px-4 py-3 text-center border-r border-gray-300" style={{ minWidth: 90 }}>Stock</th>
                    <th className="px-4 py-3 text-center" style={{ minWidth: 130 }}>Edit/Delete</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.length > 0 ? (
                    filteredProducts
                    .slice((page - 1) * perPage, page * perPage)
                    .map((p) => (
                        <tr
                        key={p.id}
                        className="transition hover:bg-gray-50"
                        >
                        <td className="px-4 py-3 border-r border-gray-200" style={{ width: 68, minWidth: 56 }}>
                            {p.images && p.images[0] ? (
                            <img
                                src={p.images[0]}
                                alt={p.name}
                                className="block w-12 h-12 rounded object-cover border mx-auto cursor-pointer hover:scale-105 transition"
                                onClick={() => setPreviewImg(p.images[0])}
                            />
                            ) : (
                            <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs mx-auto">
                                No Img
                            </div>
                            )}
                        </td>
                        <td className="px-4 py-3 border-r border-gray-200">{p.name}</td>
                        <td className="px-4 py-3 border-r border-gray-200">{p.category}</td>
                        <td className="px-4 py-3 border-r border-gray-200">{p.brand}</td>
                        <td className="px-4 py-3 text-left font-mono border-r border-gray-200" style={{ minWidth: 110 }}>
                            Rp {p.price?.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center border-r border-gray-200" style={{ minWidth: 90 }}>{p.stock}</td>
                        <td className="px-4 py-3 text-center space-x-1" style={{ minWidth: 130 }}>
                            <button
                            title="Edit"
                            className="p-2 rounded-full hover:bg-cyan-100 text-cyan-700 transition"
                            onClick={() => startEdit(p)}
                            >
                            <Edit className="w-5 h-5" />
                            </button>
                            <button
                            title="Delete"
                            className="p-2 rounded-full hover:bg-red-100 text-red-700 transition"
                            onClick={() => removeProduct(p.id)}
                            >
                            <Trash2 className="w-5 h-5" />
                            </button>
                        </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">
                        No products found.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>

        {/* Card List: Mobile */}
        <div className="md:hidden space-y-4">
          {filteredProducts.length > 0 ? (
            filteredProducts
              .slice((page - 1) * perPage, page * perPage)
              .map((p) => (
                <div
                  key={p.id}
                  className="bg-white/90 rounded-xl shadow px-4 py-3 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    {p.images && p.images[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-14 h-14 rounded object-cover border cursor-pointer hover:scale-105 transition"
                        onClick={() => setPreviewImg(p.images[0])}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                        No Img
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-bold text-base">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.category} | {p.brand}</div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                    <button
                    title="Edit"
                    className="p-2 rounded-full hover:bg-cyan-100 text-cyan-600 transition"
                    onClick={() => startEdit(p)}
                    >
                    <Edit className="w-5 h-5" />
                    </button>
                      <button
                        title="Delete"
                        className="p-2 rounded-full hover:bg-red-600 text-rose-900 transition"
                        onClick={() => removeProduct(p.id)}
                        >
                        <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <span className="text-xs text-gray-500">Harga:</span>
                      <div className="font-mono font-bold">Rp {p.price?.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Stok:</span>
                      <div className="font-bold">{p.stock}</div>
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

        {/* Tombol Terbaru/Terlama */}
        {filteredProducts.length > perPage && (
          <div className="flex gap-2 justify-center my-4">
            <button
              className="px-3 py-1 rounded bg-gray-600 text-white font-semibold shadow hover:bg-gray-700 transition"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              Newest
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-600 text-white font-semibold shadow hover:bg-gray-700 transition"
              onClick={() => setPage(Math.ceil(filteredProducts.length / perPage))}
              disabled={page === Math.ceil(filteredProducts.length / perPage)}
            >
              Oldest
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
