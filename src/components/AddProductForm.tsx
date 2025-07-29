import { useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = async () => {
    if (!name || price <= 0 || stock < 0) {
      alert("Isi data dengan benar");
      return;
    }

    await addDoc(collection(db, 'products'), {
      name,
      stock,
      price,
      description: '',
      images: [],
      rating: 4.5,
      category: 't-shirts',
      brand: 'DEFAULT BRAND',
    });

    alert('✅ Produk berhasil ditambahkan!');
    setName('');
    setStock(0);
    setPrice(0);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Stok"
        value={stock}
        onChange={(e) => setStock(+e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
        className="p-2 border rounded-md"
      />
      <div className="md:col-span-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Simpan Produk
        </button>
      </div>
    </form>
  );
}
