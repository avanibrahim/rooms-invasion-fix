import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products as staticProducts, Product } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

// Firestore
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const PAGE_SIZE = 8;

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement | null>(null);

  

  // Subscribe real-time and keep static order for existing items
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const live = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>),
        })) as Product[];

        const staticMap = new Map<string, number>(
          staticProducts.map((p, idx) => [p.id, idx])
        );
        const newItems = live.filter((p) => !staticMap.has(p.id));
        const staticItems = live
          .filter((p) => staticMap.has(p.id))
          .sort((a, b) => (staticMap.get(a.id)! - staticMap.get(b.id)!));

        setProducts([...newItems, ...staticItems]);
      },
      (err) => console.error('Firestore snapshot error:', err)
    );
    return () => unsub();
  }, []);

  // derive categories
  const categories = useMemo(
    () => ['all', ...new Set(products.map((p) => p.category))],
    [products]
  );

  // filter logic
  const filteredProducts = useMemo(() => {
    const tq = searchQuery.toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(tq) ||
        product.description.toLowerCase().includes(tq);
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  // pagination derived
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  // Helper: tentukan 3 nomor halaman yang ditampilkan
const getCompactPages = (total: number, current: number) => {
  // start = 1 kalau masih di awal; kalau sudah lewat, mulai dari current
  // tapi kalau mendekati akhir, geser supaya tetap dapat 3 angka
  const start = current <= 2 ? 1 : Math.min(current, Math.max(1, total - 2));
  const end = Math.min(start + 2, total);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);
  return { pages, start };
};

const { pages, start } = getCompactPages(totalPages, currentPage);
// Ellipsis kiri muncul jika start > 1
const showLeftDots = start > 1;
// Ellipsis kanan hanya saat masih di awal (sesuai permintaan)
const showRightDots = start === 1 && totalPages > 3;


  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  // reset ke halaman 1 saat filter/search berubah
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery, selectedCategory]);

// pindah halaman
const goToPage = (p: number) => {
  const safe = Math.min(Math.max(1, p), totalPages);
  if (safe !== currentPage) setCurrentPage(safe);
};

// tiap ganti halaman, scroll ke top layar
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [currentPage]);

const handleProductClick = (id: string) => navigate(`/product/${id}`);

// loading (berdasarkan gambar di halaman AKTIF saja)
useEffect(() => {
  setLoadedImages(0);
}, [pageProducts]);

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [searchQuery, selectedCategory]);


useEffect(() => {
  const totalImages = pageProducts.length * 2; // front+back
  if (totalImages > 0 && loadedImages >= totalImages) {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }
}, [loadedImages, pageProducts]);

// fallback safety
useEffect(() => {
  const t = setTimeout(() => setLoading(false), 7000);
  return () => clearTimeout(t);
}, []);


  const handleImageLoad = () => setLoadedImages((i) => i + 1);

  return (
    <>
      {loading && <LoadingScreen transparent />}
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-4xl font-semibold text-gray-900 mb-4">
              SHOP
            </h1>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative w-full md:w-96">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all'
                      ? 'All Categories'
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'} found
              {filteredProducts.length > 0 && (
                <>
                  {' '}
                  • Page {currentPage} of {totalPages}
                </>
              )}
            </p>
          </div>

          {/* Grid + Pagination */}
          {filteredProducts.length > 0 ? (
            <>
              <div
                ref={gridRef}
                className="px-0 sm:px-4 md:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {pageProducts.map((prod) => {
                  const isOOS = (prod.stock || 0) === 0;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="group bg-white rounded-lg overflow-hidden  cursor-pointer"
                    >
                      <div className="relative w-full aspect-square bg-white overflow-hidden">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          onLoad={handleImageLoad}
                          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                        {prod.images[1] && (
                          <img
                            src={prod.images[1]}
                            alt={`${prod.name} - back`}
                            onLoad={handleImageLoad}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        )}

                        {isOOS ? (
                          <div className="absolute top-2 left-2 z-10">
                            <span className="bg-red-800 text-white text-xs px-2 py-1 rounded-full">
                              OUT OF STOCK
                            </span>
                          </div>
                        ) : prod.stock! <= 5 ? (
                          <div className="absolute top-2 left-2 z-10">
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                              LOW STOCK
                            </span>
                          </div>
                        ) : null}
                        <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-0 transition-all duration-300" />
                      </div>

                      <div className="p-3 space-y-2">
                        <h3 className="font-semibold text-sm md:text-base line-clamp-2 transition-colors text-gray-900 group-hover:text-gray-700">
                          {prod.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm md:text-base text-gray-900">
                            Rp {prod.price.toLocaleString('id-ID')}
                          </p>
                          {prod.originalPrice && prod.originalPrice > prod.price && (
                            <p className="text-sm line-through text-gray-500">
                              Rp {prod.originalPrice.toLocaleString('id-ID')}
                            </p>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs md:text-sm">
                          {prod.brand}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
  {/* Prev */}
  <button
    onClick={() => goToPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-2 rounded-lg border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
  >
    &lt;
  </button>

  {/* Left dots */}
  {showLeftDots && (
    <span className="px-2 text-gray-500 select-none">…</span>
  )}

  {/* Page numbers (3 buah) */}
  {pages.map((p) => (
    <button
      key={p}
      onClick={() => goToPage(p)}
      className={`h-9 min-w-9 px-3 py-2 rounded-lg text-sm border
        ${p === currentPage ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
      aria-current={p === currentPage ? 'page' : undefined}
    >
      {p}
    </button>
  ))}

  {/* Right dots (hanya saat di awal, mis. "< 1 2 3 ... >") */}
  {showRightDots && (
    <span className="px-2 text-gray-500 select-none">…</span>
  )}

  {/* Next */}
  <button
    onClick={() => goToPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-2 rounded-lg border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
  >
    &gt;
  </button>
</nav>

            </>
          ) : (
            <div className="text-center py-16">
              <Search size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Shop;
