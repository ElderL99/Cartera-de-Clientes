'use client';
import { useState } from 'react';
import { agregarCredito, editarCredito } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function CreditoForm({ clienteId, onClose, onRefresh, credito }) {
    const { token } = useAuth();
    const [mensaje, setMensaje] = useState('');

    const [form, setForm] = useState({
        tipo: credito?.tipo || 'Domiciliado',
        fechaVenta: credito?.fechaVenta?.substring(0, 10) || '',
        fechaPrimerDescuento: credito?.fechaPrimerDescuento?.substring(0, 10) || '',
        plazo: credito?.plazo || '',
        financiera: credito?.financiera || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (
            !form.tipo ||
            !form.fechaVenta ||
            !form.fechaPrimerDescuento ||
            !form.plazo ||
            !form.financiera
        ) {
            setMensaje('❌ Todos los campos son obligatorios');
            return;
        }

        let res;
        if (credito) {
            res = await editarCredito(token, clienteId, credito._id, form);
        } else {
            res = await agregarCredito(token, clienteId, form);
        }

        if (res?.message) {
            if (onRefresh) onRefresh();
            onClose();
        } else {
            setMensaje('❌ Error al guardar crédito');
        }
    };


    return (
        <div className="bg-[#2a2a2a] p-4 rounded-xl mb-4 shadow-md">
            <h3 className="text-lg font-bold mb-2">
                {credito ? 'Editar Crédito' : 'Nuevo Crédito'}
            </h3>
            {mensaje && <p className="text-sm mb-2 text-red-400">{mensaje}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <select
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                    className="w-full px-4 py-2 rounded bg-[#333] text-white"
                >
                    <option value="Domiciliado">Domiciliado</option>
                    <option value="Nomina">Nomina</option>
                </select>

                <input
                    type="date"
                    value={form.fechaVenta}
                    onChange={(e) => setForm({ ...form, fechaVenta: e.target.value })}
                    className="w-full px-4 py-2 rounded bg-[#333] text-white"
                />
                <input
                    type="date"
                    value={form.fechaPrimerDescuento}
                    onChange={(e) => setForm({ ...form, fechaPrimerDescuento: e.target.value })}
                    className="w-full px-4 py-2 rounded bg-[#333] text-white"
                />
                <input
                    type="number"
                    placeholder="Plazo (meses)"
                    value={form.plazo}
                    onChange={(e) => setForm({ ...form, plazo: e.target.value })}
                    className="w-full px-4 py-2 rounded bg-[#333] text-white"
                />
                <input
                    type="text"
                    placeholder="Financiera"
                    value={form.financiera}
                    onChange={(e) => setForm({ ...form, financiera: e.target.value })}
                    className="w-full px-4 py-2 rounded bg-[#333] text-white"
                />

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                        {credito ? 'Guardar Cambios' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
