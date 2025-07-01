'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useClienteById } from '@/hooks/useClienteById';
import { eliminarCredito } from '@/lib/api';
import CreditoForm from '@/components/CreditoForm';
import Link from 'next/link';

export default function ClienteDetallePage() {
  const { token } = useAuth();
  const { clienteId } = useParams();
  const { cliente, loading, error, refetch } = useClienteById(token, clienteId);

  const [showCreditoForm, setShowCreditoForm] = useState(false);
  const [showEditarForm, setShowEditarForm] = useState(false);
  const [creditoSeleccionado, setCreditoSeleccionado] = useState(null);

  if (loading) return <p className="text-white">Cargando cliente...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!cliente) return <p className="text-gray-300">Cliente no encontrado</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{cliente.nombre}</h2>
      <p className="text-gray-300">📍 {cliente.direccion}</p>
      <p className="text-gray-300">📞 {cliente.telefono}</p>
      <p className="text-gray-300">🤝 Convenios: {cliente.convenios.join(', ')}</p>

      <h3 className="text-xl mt-6 mb-2 font-semibold">Créditos</h3>

      <table className="w-full bg-[#2a2a2a] rounded-xl overflow-hidden">
        <thead className="bg-[#333]">
          <tr>
            <th className="px-4 py-2 text-left">Tipo</th>
            <th className="px-4 py-2 text-left">Financiera</th>
            <th className="px-4 py-2 text-left">Venta</th>
            <th className="px-4 py-2 text-left">1er Descuento</th>
            <th className="px-4 py-2 text-left">Plazo</th>
            <th className="px-4 py-2 text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          {cliente.creditos.map((credito, index) => (
            <tr key={index} className="border-b border-[#444]">
              <td className="px-4 py-2">{credito.tipo}</td>
              <td className="px-4 py-2">{credito.financiera}</td>
              <td className="px-4 py-2">{new Date(credito.fechaVenta).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(credito.fechaPrimerDescuento).toLocaleDateString()}</td>
              <td className="px-4 py-2">{credito.plazo} meses</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => {
                    setCreditoSeleccionado(credito);
                    setShowEditarForm(true);
                  }}
                  className="bg-yellow-600 text-white px-2 py-1 rounded text-sm hover:bg-yellow-700"
                >
                  ✏️
                </button>

                <button
                  onClick={async () => {
                    const confirmacion = confirm('¿Eliminar este crédito?');
                    if (confirmacion) {
                      await eliminarCredito(token, cliente._id, credito._id);
                      refetch();
                    }
                  }}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Agregar crédito */}
      <div className="mt-4">
        <button
          onClick={() => setShowCreditoForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ➕ Agregar Crédito
        </button>
      </div>

      {/* Formulario para editar crédito */}
      {showEditarForm && creditoSeleccionado && (
        <CreditoForm
          clienteId={cliente._id}
          credito={creditoSeleccionado}
          onClose={() => {
            setShowEditarForm(false);
            setCreditoSeleccionado(null);
            refetch();
          }}
        />
      )}

      {/* Formulario para nuevo crédito */}
      {showCreditoForm && (
        <CreditoForm
          clienteId={cliente._id}
          onClose={() => setShowCreditoForm(false)}
          onRefresh={refetch}
        />
      )}
    </div>
  );
}
