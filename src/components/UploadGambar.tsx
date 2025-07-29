import React, { useRef } from "react";

const ImageInput = ({ images, setImages }) => {
  const inputRef = useRef(null);

  // Drag & drop handler
  const handleDrop = e => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = files => {
    const imageFiles = files.filter(f => f.type.startsWith("image/"));
    Promise.all(imageFiles.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    })).then(imgs => setImages([...(images || []), ...imgs]));
  };

  // File select handler
  const handleFileChange = e => handleFiles(Array.from(e.target.files));

  // Paste URL manual
  const handleUrlPaste = e => {
    e.preventDefault();
    const url = prompt("Paste image URL:");
    if (url) setImages([...(images || []), url]);
  };

  // Aman: handler click
  const handleDivClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div
      className="w-full border-2 border-dashed rounded p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
      onClick={handleDivClick}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      title="Klik atau drag gambar ke sini"
      style={{ minHeight: 120 }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />
      <span className="text-gray-400 text-sm mb-2 select-none">
        Drag & drop gambar, klik untuk pilih, atau
        <span className="underline cursor-pointer" onClick={handleUrlPaste}> paste URL</span>
      </span>
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {(images || []).slice(0,3).map((url, idx) => (
          <img key={idx} src={url} alt="" className="w-16 h-16 rounded object-cover border" />
        ))}
      </div>
    </div>
  );
};

export default ImageInput;
