import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// Tipos opcionales: ajusta a lo que responda tu API
type AuthRequest = { username: string; password: string };
type AuthResponse = {
    user: { id: string; username: string };
    // el token viene por Set-Cookie (httpOnly), no en el body normalmente
    // token?: string;
};


export const registerUser = (data: AuthRequest) =>
    api.post("/auth/register", data);

export const loginUser = async (data: AuthRequest): Promise<AuthResponse> => {
    try {
        const res = await api.post<AuthResponse>("/auth/login", data);
        // Si el backend envía Set-Cookie: el navegador guardará la cookie automáticamente
        return res.data;
    } catch (err: unknown) {
        // Normaliza el error para que el caller pueda mostrar un mensaje
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            const message =
                (err.response?.data as any)?.message ||
                (status === 401
                    ? "Credenciales inválidas"
                    : "Error al iniciar sesión");
            throw new Error(message);
        }
        throw new Error("Error inesperado al iniciar sesión");
    }
};


export const getProfile = () => api.get("/auth/me");

export default api; // ÚNICO export default en este archivo