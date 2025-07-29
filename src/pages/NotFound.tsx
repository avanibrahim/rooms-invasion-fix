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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <img
        src="https://www.svgrepo.com/show/375541/maintenance.svg"
        alt="Maintenance"
        className="w-40 md:w-56 lg:w-64 mb-8 drop-shadow-2xl select-none pointer-events-none"
        draggable={false}
      />
      <h1 className="text-6xl md:text-8xl font-black text-gray-400 tracking-tight drop-shadow-2xl mb-4 text-center select-none">
        404
      </h1>
      <div className="uppercase text-2xl md:text-3xl font-extrabold text-white mb-2 text-center tracking-widest">
        HALAMAN TIDAK DITEMUKAN
      </div>
      <div className="mb-8 text-center text-lg md:text-2xl text-gray-300 font-semibold">
        <span className="text-red-500 font-bold">Akses Anda Ditolak.</span><br />
        Situs sedang dalam <span className="underline decoration-gray-400 underline-offset-4">Perawatan/Pengembangan</span>.<br />
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
