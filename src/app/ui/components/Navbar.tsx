"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("jwt");
        router.push("/");
    };

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Dumpsters App</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
            >
                Cerrar sesión
            </button>
        </nav>
    );
}
