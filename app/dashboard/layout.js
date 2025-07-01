'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [loading, token, router]);

  // ⏳ Mientras valida el token
  if (loading) {
    return <p className="text-white p-4">Verificando sesión...</p>;
  }

  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
