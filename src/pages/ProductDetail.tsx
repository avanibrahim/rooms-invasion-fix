// src/pages/ProductDetail.tsx — FINAL (public path fix)
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { toast } from '../hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

// Firestore
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Product } from '../data/products';

const PLACEHOLDER = '/placeholder.png'; // taruh file ini di public/ (opsional)

// --- helper: pastikan path ke gambar jadi ABSOLUT dari public/ ---
// contoh: "KNUCKLE/GREEN/FRONT.png" -> "/KNUCKLE/GREEN/FRONT.png"
//        "http(s)://..." tetap sama
const fixUrl = (u: string): string => {
  if (!u) return '';
  if (u.startsWith('http')) return encodeURI(u);
  return '/' + u.replace(/^\/+/, '');
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [hoverPreview, setHoverPreview] = useState(false);

  // Ambil produk realtime
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const ref = doc(db, 'products', id);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Omit<Product, 'id'>;
          setProduct({ id: snap.id, ...data });
        } else {
          setProduct(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching product:', err);
        setProduct(null);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [id]);

  if (loading) return <LoadingScreen transparent />;

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Siapkan gambar
  const images: string[] = Array.isArray(product.images)
    ? (product.images as unknown[])
        .map((i) => (typeof i === 'string' ? fixUrl(i) : ''))
        .filter(Boolean)
    : [];
  if (images.length === 0 && (product as any).image) {
    images.push(fixUrl(String((product as any).image)));
  }
  const front = images[0] || PLACEHOLDER;
  const back = images[1] || images[0] || PLACEHOLDER;

  const isOutOfStock = (product.stock || 0) === 0;
  const isLowStock = (product.stock || 0) <= 5 && (product.stock || 0) > 0;

  // Normalize sizes
  const normalizedSizes: { size: string; stock: number }[] = Array.isArray(product.sizes)
    ? typeof product.sizes[0] === 'string'
      ? (product.sizes as string[]).map((s) => ({ size: s, stock: product.stock! }))
      : ((product.sizes as any[]) as { size: string; stock: number }[])
    : [];

  const maxQuantity = product.stock || 1;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast({ title: 'Product out of stock', description: 'This product is currently unavailable.', variant: 'destructive' });
      return;
    }
    if (normalizedSizes.length > 0 && !selectedSize) {
      toast({ title: 'Please select a size', description: 'Size selection is required for this product.', variant: 'destructive' });
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: front,
      size: selectedSize || 'One Size',
      color: selectedColor || 'Colour-Wise',
      quantity,
      stock: product.stock!,
    });
    toast({ title: 'Added to cart!', description: `${product.name} has been added to your cart.` });
  };

  // Size chart helper
  const getSizeChartImage = (prod: Product) => {
    const cat = prod.category?.toLowerCase() || '';
    if (cat.includes('t-shirt')) return '/sizechart/t-shirt.png';
    if (cat.includes('shirt')) return '/sizechart/shirt.png';
    if (cat.includes('outerwear')) return '/sizechart/default.png';
    if (cat.includes('pant') || cat.includes('short')) return '/sizechart/pants.png';
    return '/sizechart/default.png';
  };
  const sizeChartImage = getSizeChartImage(product);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-8 py-8">
        <button
          onClick={() => navigate('/shop')}
          className="text-lg md:text-xl font-semibold flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={24} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image viewer (front/back hover) */}
          <div className="space-y-4">
            <div
              className="relative w-full aspect-square bg-white rounded-lg overflow-hidden"
              onMouseEnter={() => setHoverPreview(true)}
              onMouseLeave={() => setHoverPreview(false)}
            >
              <img
                src={front}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoverPreview ? 'opacity-0' : 'opacity-100'}`}
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = PLACEHOLDER)}
                draggable="false"
              />
              <img
                src={back}
                alt={`${product.name} back`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoverPreview ? 'opacity-100' : 'opacity-0'}`}
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = PLACEHOLDER)}
                draggable="false"
              />
              {isOutOfStock && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-800 text-white text-xs px-2 py-1 rounded-full">OUT OF STOCK</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border">
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).src = PLACEHOLDER)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
            </div>
            <p className="text-gray-600 mb-2">{product.brand}</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-sm line-through text-gray-500">Rp {product.originalPrice.toLocaleString('id-ID')}</p>
              )}
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">DESCRIPTION :</h3>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-list space-y-2 mb-4">
                {(product.description || '')
                  .split('•')
                  .map((point) => point.trim())
                  .filter(Boolean)
                  .map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
              </ul>
            </div>

            {product.category !== 'accessories' && product.category !== 'shorts' && (
              <a
                href={sizeChartImage}
                target="_blank"
                rel="noreferrer"
                className="text-white px-4 py-2 border rounded-lg transition-colors bg-gray-900"
              >
                SIZE CHART
              </a>
            )}

            {normalizedSizes.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-2 pt-4">
                  {normalizedSizes.map(({ size, stock }) => (
                    <button
                      key={size}
                      disabled={stock === 0}
                      onClick={() => stock > 0 && setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        stock === 0
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 pt-4">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2 border rounded-lg hover:bg-gray-100">
                <Minus size={16} />
              </button>
              <span className="font-medium">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))} className="p-2 border rounded-lg hover:bg-gray-100">
                <Plus size={16} />
              </button>
              {isLowStock && <span className="text-sm text-orange-600">Max: {product.stock}</span>}
            </div>

            <div className="space-y-4 pt-2 pb-2">
              {isOutOfStock ? (
                <div className="space-y-3">
                  <button disabled className="w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-lg font-semibold cursor-not-allowed">
                    Out of Stock - Cannot Add to Cart
                  </button>
                </div>
              ) : (
                <button onClick={handleAddToCart} className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Add to Cart - Rp {(product.price * quantity).toLocaleString('id-ID')}
                </button>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Category:</span><span className="font-medium capitalize">{product.category}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Brand:</span><span className="font-medium">{product.brand}</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
