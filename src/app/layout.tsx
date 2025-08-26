import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Mi App",
    description: "App con Next.js y Spring Boot",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    // Leemos la cookie para saber si el usuario está logueado
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt");

    return (
        <html lang="es">
        <body className="min-h-screen bg-gray-100 text-gray-900">
        {/* Navbar solo si hay token */}
        {token && <Navbar />}
        <main className="p-4">{children}</main>
        </body>
        </html>
    );
}