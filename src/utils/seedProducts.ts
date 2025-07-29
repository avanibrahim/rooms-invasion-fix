import { products } from '@/data/products';
import { db } from '@/lib/firebase';
import { setDoc, doc, collection } from 'firebase/firestore';

export const seedProducts = async () => {
  const col = collection(db, 'products');
  for (const product of products) {
    await setDoc(doc(col, product.id), product);
  }
  console.log('✅ Semua produk berhasil di-seed ke Firestore!');
};
