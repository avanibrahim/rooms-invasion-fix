import React, { useState, useRef } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const LookbookUpload = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc || !file) {
      alert("Lengkapi semua field dan pilih gambar!");
      return;
    }
    setLoading(true);
    try {
      // 1. Upload ke Storage
      const storageRef = ref(storage, `lookbook/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      // 2. Simpan ke Firestore
      await addDoc(collection(db, "lookbook"), {
        title,
        description: desc,
        image: imageUrl,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDesc("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset file input
      alert("Lookbook uploaded!");

    } catch (e: any) {
      alert("Gagal upload: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 max-w-md mx-auto flex flex-col gap-4"
    >
      <div>
        <label className="block font-bold mb-1">Judul</label>
        <input
          className="border px-3 py-2 rounded w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-1">Deskripsi</label>
        <textarea
          className="border px-3 py-2 rounded w-full"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-1">Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files?.[0] || null)}
          required
          ref={fileInputRef}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-cyan-700 hover:bg-cyan-900 text-white px-4 py-2 rounded font-bold"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default LookbookUpload;
