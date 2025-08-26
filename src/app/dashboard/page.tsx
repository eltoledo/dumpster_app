"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/app/lib/api";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        getProfile()
            .then((res) => setUser(res.data))
            .catch(() => router.push("/login"));
    }, []);

    if (!user) return <p>Cargando...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl">Bienvenido, {user.username}</h1>
            <p>Este es tu dashboard protegido.</p>
        </div>
    );
}
