import api from "@/api/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const fetchUser = async () => {
        try {
            const { data } = await api.get("/auth/me");
            setUser(data.data.user);
        } catch {
            setUser(null);
        }
    };
    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
            toast.success("User logout")
        } catch (error) {
            console.log(error);
            toast.error("User logout fail")
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}