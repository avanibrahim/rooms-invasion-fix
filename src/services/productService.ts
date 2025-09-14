// src/services/productService.ts
import { db, auth /*, storage*/ } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

function N(v:any){const n=Number(v);return Number.isFinite(n)?n:0}
function S(v:any){return String(v??'').trim()}

export async function addProductFromForm(form:any){
  // buat 1 dokumen product saja (tanpa tulis subcollection/aktivitas dlsb)
  const ref = await addDoc(collection(db,'products'),{
    name:        S(form.name),
    brand:       S(form.brand),
    description: S(form.description),
    category:    S(form.category),
    price:       N(form.price),
    stock:       N(form.stock),
    sizes:       (form.sizes??[]).map((s:any)=>({size:S(s.size),stock:N(s.stock)})),
    images:      Array.isArray(form.images)?form.images.filter(Boolean):[],
    published:   true,
    createdBy:   auth.currentUser!.uid,
    createdAt:   serverTimestamp(),
    updatedAt:   serverTimestamp(),
  })
  return ref.id
}
