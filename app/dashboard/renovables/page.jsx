'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getRenovables } from '@/lib/api';
import Link from 'next/link';

export default function RenovablesPage() {
  const { token } = useAuth();
  const [clientesOriginales, setClientesOriginales] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    getRenovables(token)
      .then((res) => {
        const clientes = res.clientes || [];
        setClientesOriginales(clientes);
        setClientesFiltrados(clientes); // todos al inicio
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener renovables');
        setLoading(false);
      });
  }, [token]);

  // 🔁 Aplicar filtro de tipo
  useEffect(() => {
    if (!tipoFiltro) {
      setClientesFiltrados(clientesOriginales);
    } else {
      const filtrados = clientesOriginales.filter((cliente) =>
        cliente.creditos.some((c) => c.tipo === tipoFiltro)
      );
      setClientesFiltrados(filtrados);
    }
  }, [tipoFiltro, clientesOriginales]);

  if (loading) return <p className="text-white">Cargando renovables...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clientes Renovables</h2>

      {/* Botones de filtro */}
      <div className="mb-4">
        <label className="text-sm block mb-1">Filtrar por tipo de crédito:</label>
        <select
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
          className="bg-[#2a2a2a] text-white px-4 py-2 rounded border border-[#444]"
        >
          <option value="">Todos</option>
          <option value="Nomina">Nomina</option>
          <option value="Domiciliado">Domiciliado</option>
        </select>
      </div>


      {/* Tabla */}
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
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente._id} className="border-b border-[#444]">
              <td className="px-4 py-2">{cliente.nombre}</td>
              <td className="px-4 py-2">{cliente.telefono}</td>
              <td className="px-4 py-2">{cliente.convenios.join(', ')}</td>
              <td className="px-4 py-2">{cliente.creditos.length}</td>
              <td className="px-4 py-2">
                <Link href={`/dashboard/${cliente._id}`} className="text-blue-400 hover:underline">
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
