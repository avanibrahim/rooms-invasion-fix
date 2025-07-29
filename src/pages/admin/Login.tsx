// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk show/hide password
  const [error, setError] = useState('');

  // ========== ANTI-INSPECT/CONSOLE ==========
  useEffect(() => {
    // Disable right-click/context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable devtools keyboard shortcuts
    const blockDevTools = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) e.preventDefault();
      // Ctrl+Shift+I / Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j')) {
        e.preventDefault();
      }
      // Ctrl+U, Ctrl+S
      if (e.ctrlKey && (e.key.toLowerCase() === 'u' || e.key.toLowerCase() === 's')) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', blockDevTools);

    // Hide content if devtools detected (via resize trick)
    const threshold = 160;
    const checkDevTools = () => {
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.innerHTML = '<h1 style="color:white;text-align:center;margin-top:50vh;">Unauthorized</h1>';
      }
    };
    window.addEventListener('resize', checkDevTools);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', blockDevTools);
      window.removeEventListener('resize', checkDevTools);
    };
  }, []);
  // ========== END ANTI-INSPECT/CONSOLE ==========

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) navigate('/takezon');
    });
    return unsub;
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/takezon');
    } catch {
      setError('Upsss you wrong!.');
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/image/logo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        minHeight: '100dvh',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md mx-2 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-4 sm:p-6 md:p-10">
        <div className="flex flex-col items-center mb-4 sm:mb-7">
          <div className="mb-4 flex justify-center w-full">
            <img
              src="/admin.png"
              alt="Rooms Invasion Logo"
              className="w-24 sm:w-28 md:w-36 max-w-xs h-auto block filter invert"
              draggable={false}
            />
          </div>
          <span className="text-gray-100 text-xs tracking-wide text-center mt-2">
            Please login to access the admin panel
          </span>
        </div>

        {error && (
          <div className="mb-4 text-center text-sm bg-red-500/80 text-white rounded-lg px-4 py-2 shadow">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div className="relative">
            <label htmlFor="email" className="block text-xs font-bold text-gray-100 mb-1">
              Username
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              inputMode="email"
              className="w-full p-3 pl-11 rounded-lg border border-black-500 bg-black/20 text-white text-base focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-black-400 transition placeholder-black-300 shadow-inner"
              placeholder="......"
            />
            <span className="absolute left-3 top-8 pointer-events-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/10628/10628940.png"
                alt="Email Icon"
                className="w-5 h-5 object-contain filter invert"
                draggable={false}
              />
            </span>
          </div>
          {/* PASSWORD */}
          <div className="relative">
            <label htmlFor="password" className="block text-xs font-bold text-gray-100 mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              inputMode="text"
              className="w-full p-3 pl-11 pr-11 rounded-lg border border-black-500 bg-black/20 text-white text-base focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-black-400 transition placeholder-black-300 shadow-inner"
              placeholder="......"
            />
            <span className="absolute left-3 top-8 pointer-events-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
                alt="Password Icon"
                className="w-5 h-5 object-contain filter invert"
                draggable={false}
              />
            </span>
            <span
              className="absolute right-3 top-8 cursor-pointer transition"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setShowPassword(v => !v)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              role="button"
            >
              {showPassword ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/159/159604.png"
                  alt="Hide password"
                  className="w-5 h-5 object-contain filter invert"
                  draggable={false}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/10812/10812267.png"
                  alt="Show password"
                  className="w-5 h-5 object-contain filter invert"
                  draggable={false}
                />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-black-500 via-blue-600 to-black-700 text-white font-bold rounded-xl shadow-lg hover:from-black-600 hover:to-blue-800 hover:scale-[1.01] transition-all duration-150 text-base tracking-wide"
          >
            LOGIN
          </button>
        </form>
        <div className="mt-8 text-center text-xs text-gray-100">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-black-300">ROOMS INVASION</span> — All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Login;
