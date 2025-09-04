"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
           // await registerUser({ username, password });
            router.push("/auth/login");
        } catch (err) {
            alert("Error al registrar");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 max-w-sm mx-auto">
            <h1 className="text-2xl">Registro</h1>
            <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2" />
            <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
            <button className="bg-blue-500 text-white p-2">Registrar</button>
        </form>
    );
}
 

