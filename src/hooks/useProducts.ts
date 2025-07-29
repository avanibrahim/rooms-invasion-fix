import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const updateStock = async (id: string, stock: number) => {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, { stock });
  };

  return { products, updateStock };
}
