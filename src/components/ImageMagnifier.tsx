import React, { useRef, useState } from "react";

const ImageMagnifier = ({
  src,
  alt,
  width = 400,
  height = 400,
  zoom = 2,
  magnifierSize = 120,
  className = "",
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMagnifierPosition({ x, y });
  };

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
        draggable="false"
        style={{ width, height }}
      />
      {showMagnifier && (
        <div
          className="pointer-events-none absolute border-2 border-black rounded-full"
          style={{
            width: magnifierSize,
            height: magnifierSize,
            left: magnifierPosition.x - magnifierSize / 2,
            top: magnifierPosition.y - magnifierSize / 2,
            background: `url('${src}') no-repeat`,
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: `-${magnifierPosition.x * zoom - magnifierSize / 2}px -${magnifierPosition.y * zoom - magnifierSize / 2}px`,
            boxShadow: "0 2px 8px rgba(0,0,0,.15)",
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
