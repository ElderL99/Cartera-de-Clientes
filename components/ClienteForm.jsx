'use client';
import { useState } from 'react';
import { crearCliente, editarCliente } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function ClienteForm({ onClose, onRefresh, cliente }) {
  const { token } = useAuth();
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState({
    nombre: cliente?.nombre || '',
    direccion: cliente?.direccion || '',
    telefono: cliente?.telefono || '',
    tipoRetiro: cliente?.tipoRetiro || '',
    convenios: cliente?.convenios || []
  });

  const conveniosDisponibles = [
    'Pemex', 'CFE', 'IMSS', 'Issste', 'IMSS activos',
    'Gobierno CDMX', 'GEM', 'Seime', 'Hospitales CDMX'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.nombre ||
      !form.direccion ||
      !form.telefono ||
      !form.tipoRetiro ||
      form.convenios.length === 0
    ) {
      setMensaje('❌ Todos los campos son obligatorios');
      return;
    }

    let res;
    if (cliente) {
      res = await editarCliente(token, cliente._id, form);
    } else {
      res = await crearCliente(token, form);
    }

    if (res?.cliente) {
      if (onRefresh) onRefresh();
      onClose();
    } else {
      setMensaje('❌ Error al guardar cliente');
    }
  };

  const toggleConvenio = (c) => {
    setForm((prev) => ({
      ...prev,
      convenios: prev.convenios.includes(c)
        ? prev.convenios.filter(item => item !== c)
        : [...prev.convenios, c]
    }));
  };

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-xl mb-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">
        {cliente ? 'Editar Cliente' : 'Nuevo Cliente'}
      </h3>
      {mensaje && <p className="text-sm mb-2 text-red-400">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="w-full px-4 py-2 rounded bg-[#333] text-white"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          className="w-full px-4 py-2 rounded bg-[#333] text-white"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="w-full px-4 py-2 rounded bg-[#333] text-white"
        />

        <select
          value={form.tipoRetiro}
          onChange={(e) => setForm({ ...form, tipoRetiro: e.target.value })}
          className="w-full px-4 py-2 rounded bg-[#333] text-white"
        >
          <option value="">Seleccione tipo de retiro</option>
          <option value="Pensionado">Pensionado</option>
          <option value="Jubilado">Jubilado</option>
        </select>

        <div>
          <p className="text-sm mb-1">Convenios:</p>
          <div className="flex flex-wrap gap-2">
            {conveniosDisponibles.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => toggleConvenio(c)}
                className={`px-3 py-1 rounded text-sm border ${
                  form.convenios.includes(c)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-[#444] text-white border-[#555]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            {cliente ? 'Guardar cambios' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}
