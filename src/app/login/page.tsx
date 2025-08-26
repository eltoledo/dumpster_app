"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/lib/api";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser({ username, password });
            router.push("/dashboard");
        } catch (err) {
            alert("Credenciales inválidas");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 max-w-sm mx-auto">
            <h1 className="text-2xl">Login</h1>
            <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2" />
            <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
            <button className="bg-green-500 text-white p-2">Entrar</button>
        </form>
    );
}
