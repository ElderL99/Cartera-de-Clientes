'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Home, Users, RotateCcw, LogOut } from 'lucide-react'; // puedes instalar lucide-react

export default function Sidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href ? 'bg-blue-600 text-white' : 'hover:bg-[#333]';

  return (
    <aside className="w-60 bg-[#2a2a2a] flex flex-col justify-between">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">📊 CRM</h1>
        <nav className="space-y-2">
          <Link href="/dashboard" className={`flex items-center gap-2 px-4 py-2 rounded ${isActive('/dashboard')}`}>
            <Home size={18} />
            Inicio
          </Link>
          <Link href="/dashboard/renovables" className={`flex items-center gap-2 px-4 py-2 rounded ${isActive('/dashboard/renovables')}`}>
            <RotateCcw size={18} />
            Renovables
          </Link>
          <Link href="/dashboard/Clientes" className={`flex items-center gap-2 px-4 py-2 rounded ${isActive('/dashboard/clientes')}`}>
            <Users size={18} />
            Clientes
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t border-[#444]">
        <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700">
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
