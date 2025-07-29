// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
    {/* Left panel with image background on desktop */}
    <div
      className="flex items-center justify-center bg-[url('/image/tes.jpg')] bg-cover bg-center md:bg-black md:bg-none p-6"
    >
      <div className="w-full max-w-md bg-gray-500 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">ROOMS INVASION</h2>
        {error && <p className="text-gray-100 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">...</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">...</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          COPYRIGHT ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
    <div
      className="hidden md:flex flex-col justify-center items-center bg-cover bg-center p-10"
      style={{ backgroundImage: "url('/image/tes.jpg')" }}
    >
      {/* Logo overlay */}
    </div>

    {/* Right panel: on mobile shows image as background behind form, on desktop plain */}
  </div>
);
};

export default Login;

