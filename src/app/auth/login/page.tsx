"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/hooks/useAuth';
import { Spin } from "antd";
import React from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { user, login, logout } = useAuth();

   React.useEffect(() => {
    setLoading(false);
    logout();
   }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
         try{
            await login(username,password);
            router.push("/dashboard/home");           
         }catch (err: unknown) {
          alert(err);
          setLoading(false);
         }   
    };

     if (loading) {
        return <Spin 
                size="large"
                className="custom-spin"
                 style={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)'
                        }}
                />
      } 
    
    return (
       <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 max-w-sm mx-auto">
            <h1 className="text-2xl">Login</h1>
            <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2" />
            <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
            <button className="bg-green-500 text-white p-2">Entrar</button>
        </form>
    );
   
}
