import React, { useState } from "react";
import { supabase } from "@/lib/supabase"; // Pastikan path benar

export default function ImagesUploader({ images, setImages }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    setError("");
    const files = Array.from(e.target.files);
    const invalidFiles = files.filter(f => f.size > 2 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError(`Ada file >2MB: ${invalidFiles.map(f => f.name).join(", ")}`);
      return;
    }
    setUploading(true);
    let newImages = [];
    for (const file of files) {
      const filename = `${Date.now()}-${file.name.replace(/\s/g, "")}`;
      const { error: uploadError } = await supabase.storage
        .from("produk")
        .upload(filename, file);
      if (uploadError) {
        setError("Gagal upload gambar: " + uploadError.message);
        setUploading(false);
        return;
      }
      const { publicUrl } = supabase.storage
        .from("produk")
        .getPublicUrl(filename).data;
      newImages.push(publicUrl);
    }
    setImages([...(images || []), ...newImages]);
    setUploading(false);
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="mb-2"
      />
      <div className="flex gap-2 mt-1">
        {(images || [])
          .filter(Boolean)
          .slice(0, 3)
          .map((url, idx) => (
            <div key={idx} className="relative group">
              <img
                src={url}
                alt=""
                className="w-12 h-12 rounded object-cover border"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-white text-gray-700 p-0.5 rounded-full border hover:bg-red-100"
                title="Remove"
                onClick={() => handleRemoveImage(idx)}
              >
                ×
              </button>
            </div>
          ))}
      </div>
      {uploading && <div className="text-xs text-blue-500 mt-1">Uploading...</div>}
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
}
