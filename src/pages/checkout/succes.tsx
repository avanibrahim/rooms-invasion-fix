import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const handleUpdateStock = async (productId: string, newStock: number) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, { stock: newStock });
};
