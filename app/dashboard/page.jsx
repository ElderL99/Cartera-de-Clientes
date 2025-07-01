'use client';
import { useAuth } from '@/hooks/useAuth';
import { useStats } from '@/hooks/useStats';
import DashboardCard from '@/components/DashboardCard';
import { Users, CreditCard, RefreshCw, UserCheck, UserMinus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { token } = useAuth();
  const { stats, loading, error } = useStats();

  if (loading) return <p className="text-white">Cargando estadísticas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const chartData = [
    { name: 'Clientes', value: stats.totalClientes },
    { name: 'Con Créditos', value: stats.clientesConCreditos },
    { name: 'Renovables', value: stats.renovables },
    { name: 'Pensionados', value: stats.pensionados },
    { name: 'Jubilados', value: stats.jubilados },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Resumen general</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Total Clientes" value={stats.totalClientes} icon={<Users />} />
        <DashboardCard title="Con Créditos" value={stats.clientesConCreditos} icon={<CreditCard />} />
        <DashboardCard title="Renovables" value={stats.renovables} icon={<RefreshCw />} />
        <DashboardCard title="Pensionados" value={stats.pensionados} icon={<UserCheck />} />
        <DashboardCard title="Jubilados" value={stats.jubilados} icon={<UserMinus />} />
      </div>

      <div className="bg-[#2a2a2a] p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Visualización general</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
