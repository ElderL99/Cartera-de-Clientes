'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginRequest } from '@/lib/api';
import Cookies from 'js-cookie'; // ← necesitas instalar esto

export function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginRequest(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      Cookies.set('token', res.token); // ✅ también en cookie
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
