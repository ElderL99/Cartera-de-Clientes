'use client';
import { useState, useEffect } from 'react';
import { getClienteById } from '@/lib/api';

export function useClienteById(token, id) {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCliente = async () => {
    setLoading(true);
    try {
      const res = await getClienteById(token, id);
      setCliente(res.cliente || null);
    } catch (err) {
      setError('Error al obtener cliente');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token && id) fetchCliente();
  }, [token, id]);

  return { cliente, loading, error, refetch: fetchCliente };
}
