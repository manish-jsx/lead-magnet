import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('access_token', data.access_token);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  return { login, logout, loading };
};