'use client';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  );
}
