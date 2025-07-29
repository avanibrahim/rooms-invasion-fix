import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/data/products';

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getDocs(collection(db, 'products')).then(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(data);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛍️ Produk Kami</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden">
            <img src={p.images[0]} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.brand}</p>
              <p className="font-bold text-blue-600">Rp{p.price.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Stok: {p.stock === 0 ? 'Habis' : p.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
