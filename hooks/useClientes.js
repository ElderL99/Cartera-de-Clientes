'use client';
import { useState, useEffect } from 'react';
import { getClientes } from '@/lib/api';

export function useClientes(token, filtros = {}) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClientes = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await getClientes(token, filtros); 
      setClientes(res.clientes || []);
    } catch (err) {
      setError('Error al cargar clientes');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClientes();
  }, [token, JSON.stringify(filtros)]); 

  return { clientes, loading, error, refetch: fetchClientes };
}
