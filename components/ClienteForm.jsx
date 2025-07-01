'use client';
import { useState } from 'react';
import { crearCliente } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function ClienteForm({ onClose, onRefresh }) {
    const { token } = useAuth();
    const [form, setForm] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        convenios: []
    });
    const [mensaje, setMensaje] = useState('');

    const conveniosDisponibles = [
        'Pemex', 'CFE', 'IMSS', 'Issste', 'IMSS activos',
        'Gobierno CDMX', 'GEM', 'Seime', 'Hospitales CDMX'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await crearCliente(token, form);
        if (res?.cliente) {
            setMensaje('✅ Cliente creado');
            if (onRefresh) onRefresh(); // 🔄 recarga la tabla
            onClose(); // ❌ ya no se queda abierto
        }
        else {
            setMensaje('❌ Error al crear cliente');
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
            <h3 className="text-xl font-bold mb-2">Nuevo Cliente</h3>
            {mensaje && <p className="text-sm mb-2">{mensaje}</p>}
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

                <div>
                    <p className="text-sm mb-1">Convenios:</p>
                    <div className="flex flex-wrap gap-2">
                        {conveniosDisponibles.map((c) => (
                            <button
                                type="button"
                                key={c}
                                onClick={() => toggleConvenio(c)}
                                className={`px-3 py-1 rounded text-sm border ${form.convenios.includes(c)
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
                    <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
