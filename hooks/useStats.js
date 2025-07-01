'use client';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useStats() {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchStats = async () => {
        if (!token) return;
        try {
            const res = await fetch('/api/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setStats(data);
            } else {
                setError(data.error || 'Error al cargar estadísticas');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [token]);

    return { stats, loading, error, refetch: fetchStats };
}
