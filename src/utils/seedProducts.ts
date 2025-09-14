import { db } from '@/lib/firebase'
import { products } from '@/data/products'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export const seedProducts = async () => {
  const col = collection(db, 'products')
  for (const product of products) {
    const { id, ...rest } = product as any
    await addDoc(col, {
      ...rest,
      sku: id ?? null,                    // nomor katalog disimpan di field, BUKAN doc ID
      published: rest.published ?? true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }
}
