'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { token, login, loading } = useAuth(); // agregamos `token` y `loading`
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 🔒 Si ya hay token, redirige al dashboard
  useEffect(() => {
    if (!loading && token) {
      router.push('/dashboard');
    }
  }, [token, loading, router]);

  // ⏳ Mientras carga, muestra mensaje
  if (loading) return <p className="text-white">Verificando sesión...</p>;
  if (token) return null; // si ya está autenticado, no muestra el form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <form onSubmit={handleSubmit} className="bg-[#2a2a2a] p-6 rounded-xl shadow-md w-80 space-y-4">
        <h1 className="text-white text-xl font-bold text-center">Login</h1>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#333] text-white"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#333] text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
