import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
    user:{
        name:'',
        email:''
    },
    setUser: (_user: any) => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({
        name:'',
        email:''
    });
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}