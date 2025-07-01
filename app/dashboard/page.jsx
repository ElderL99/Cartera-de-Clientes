'use client';
import { useAuth } from '@/hooks/useAuth';
import { useClientes } from '@/hooks/useClientes';
import Link from 'next/link';

export default function DashboardPage() {
  const { token } = useAuth();
  const { clientes, loading, error } = useClientes(token);

  if (loading) return <p className="text-white">Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>

      
      <h2 className="text-2xl font-bold mb-4">Listado de Clientes</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-[#2a2a2a] rounded-xl overflow-hidden">
          <thead className="bg-[#333]">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Convenios</th>
              <th className="px-4 py-2 text-left">Créditos</th>
              <th className="px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente._id} className="border-b border-[#444] hover:bg-[#3a3a3a]">
                <td className="px-4 py-2">{cliente.nombre}</td>
                <td className="px-4 py-2">{cliente.telefono}</td>
                <td className="px-4 py-2">{cliente.convenios.join(', ')}</td>
                <td className="px-4 py-2">{cliente.creditos?.length || 0}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/dashboard/${cliente._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
