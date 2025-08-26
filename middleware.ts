import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("jwt"); // Nombre de cookie que Spring Boot devuelve
    const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
