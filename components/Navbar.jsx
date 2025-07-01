'use client';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-[#2a2a2a] px-4 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-white">Mi Cartera de Clientes</h1>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}
