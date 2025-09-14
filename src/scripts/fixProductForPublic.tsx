// src/scripts/fixProductsForPublic.ts
import { db } from '@/lib/firebase'
import { collection, getDocs, writeBatch, serverTimestamp } from 'firebase/firestore'

export async function fixProductsForPublic() {
  const snap = await getDocs(collection(db, 'products'))
  let batch = writeBatch(db), n = 0
  snap.forEach(d => {
    const p:any = d.data(), patch:any = {}
    if (p.published !== true) patch.published = true
    if (!p.createdAt || p.createdAt === 0) patch.createdAt = serverTimestamp()
    if (!p.updatedAt) patch.updatedAt = serverTimestamp()
    if (Object.keys(patch).length) { batch.update(d.ref, patch); n++ }
  })
  if (n) await batch.commit()
  console.log(`fixed ${n} product(s)`)
}
