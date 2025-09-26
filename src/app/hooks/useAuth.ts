import { useState } from 'react';
import { api } from '@/app/lib/api';
import { User } from '@/app/types/User';
import axios, { AxiosError } from 'axios';

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
    } catch (error) { 
      console.log(error)     
      if (axios.isAxiosError(error)) {
        if(error.response?.status === 403)
         throw new AxiosError('Invalid credentials');
        else
         throw new AxiosError(error.response?.data||error.message||'Error while logging in');  
      }
        
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