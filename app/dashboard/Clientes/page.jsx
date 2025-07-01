'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useClientes } from '@/hooks/useClientes';
import ClienteForm from '@/components/ClienteForm';
import Link from 'next/link';

export default function ClientesPage() {
  const { token } = useAuth();
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [convenioFiltro, setConvenioFiltro] = useState(''); // ✅ primero lo declaramos
  const { clientes, loading, error, refetch } = useClientes(token, {
    tipo: tipoFiltro,
    convenio: convenioFiltro
  });
  const [showForm, setShowForm] = useState(false);




  return (
    <div>

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

      <div className="mb-4">
        <label className="text-sm block mb-1">Filtrar por convenio:</label>
        <select
          value={convenioFiltro}
          onChange={(e) => setConvenioFiltro(e.target.value)}
          className="bg-[#2a2a2a] text-white px-4 py-2 rounded border border-[#444]"
        >
          <option value="">Todos</option>
          <option value="Pemex">Pemex</option>
          <option value="CFE">CFE</option>
          <option value="IMSS">IMSS</option>
          <option value="Issste">Issste</option>
          <option value="IMSS activos">IMSS activos</option>
          <option value="Gobierno CDMX">Gobierno CDMX</option>
          <option value="GEM">GEM</option>
          <option value="Seime">Seime</option>
          <option value="Hospitales CDMX">Hospitales CDMX</option>
        </select>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ➕ Nuevo Cliente
        </button>
      </div>

      {showForm && (
        <ClienteForm
          onClose={() => setShowForm(false)}
          onRefresh={refetch}
        />
      )}

      {loading && <p className="text-white">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full bg-[#2a2a2a] rounded-xl overflow-hidden">
        <thead className="bg-[#333]">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Convenios</th>
            <th className="px-4 py-2 text-left">Acción</th>
            <th className="px-4 py-2 text-left">Tipo</th>

          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente._id} className="border-b border-[#444] hover:bg-[#3a3a3a]">
              <td className="px-4 py-2">{cliente.nombre}</td>
              <td className="px-4 py-2">{cliente.telefono}</td>
              <td className="px-4 py-2">{cliente.convenios.join(', ')}</td>
              <td className="px-4 py-2">
                <Link
                  href={`/dashboard/${cliente._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Ver
                </Link>
              </td>
              <td className="px-4 py-2">
                {cliente.creditos[0]?.tipo || '—'}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
