import { useState } from 'react';
import { api } from '@/app/lib/api';
import { User } from '@/app/types/User';
import axios from 'axios';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null); 
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    
    try {
    
    setError(null)
    const response = await api.post('/auth/login', { username, password });
    const user = response.data;
    
    window.localStorage.setItem('authToken', user.token);
    window.localStorage.setItem('user', JSON.stringify(user)); 
    await setUser(user);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            const message =
                (err.response?.data as any)?.message ||
                (status === 401
                    ? "Credenciales inválidas"
                    : "Error al iniciar sesión");
            throw new Error(message);
    }
    }finally{
     
    }
    
    return user;
  };

  const logout = () => {
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('user');
    setUser(null);    
  };

  return { user,error, login, logout };
}