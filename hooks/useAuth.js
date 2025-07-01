'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginRequest } from '@/lib/api';
import Cookies from 'js-cookie';

export function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Cargar el token al inicio
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push('/login'); // Redirige si no hay token
    }
    setLoading(false);
  }, []);

  // ✅ Detectar cambios manuales en localStorage (por seguridad)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (!currentToken) {
        setToken(null);

        // Evita redirigir si ya estás en /login
        if (window.location.pathname !== '/login') {
          router.push('/login');
        }
      }
    }, 1000); // revisa cada 1 segundo

    return () => clearInterval(interval);
  }, []);

  const login = async (email, password) => {
    const res = await loginRequest(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      Cookies.set('token', res.token);
      setToken(res.token);
      router.push('/dashboard');
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
    setToken(null);
    router.push('/login');
  };

  return { token, isAuthenticated: !!token, loading, login, logout };
}
