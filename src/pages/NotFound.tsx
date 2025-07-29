import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-black to-gray-900 px-4">
      <img
        src="/image/notfound.svg"
        alt="Maintenance"
        className="w-40 md:w-56 lg:w-64 mb-8 drop-shadow-2xl select-none pointer-events-none"
        draggable={false}
      />
      <h1
          className="
            text-5xl md:text-8xl
            font-black
            tracking-widest
            mb-4
            text-center
            select-none
            text-red-700
            drop-shadow-[0_4px_12px_rgba(185,28,28,1)]
            font-mono
          "
          style={{
            letterSpacing: '0.15em',
            textShadow: '0 2px 18px #7f1d1d, 0 1px 8px #000'
          }}
        >
          NOT FOUND
        </h1>

      <div className="uppercase text-2xl md:text-3xl font-extrabold text-white mb-2 text-center tracking-widest">
        HALAMAN TIDAK DITEMUKAN
      </div>
      <div className="mb-8 text-center text-lg md:text-2xl text-gray-300 font-semibold">
        <span className="text-red-700 font-bold">Akses Anda Ditolak.</span><br />
        Situs sedang dalam <span className="underline decoration-red-700 underline-offset-4">Perawatan/Pengembangan</span>.<br />
        Silakan kembali ke halaman utama.
      </div>
      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 rounded-lg bg-gray-500 text-black text-lg md:text-xl font-bold shadow-lg hover:bg-gray-600 hover:text-white transition duration-150"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default NotFound;
