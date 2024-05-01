'use client';
import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext<AuthContextType | null>(null);

interface User {
    username: string;
    roles: string[];
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const defaultAuthValue: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: async () => { throw new Error("login function not implemented"); },
    logout: () => { console.error("logout function not implemented"); },
    loading: false
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    console.log("AuthProvider rendering");

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token');
            if (token) {
                axios.defaults.headers.Authorization = `Bearer ${token}`;
                const { data } = await axios.get('/api/auth/validate'); // ???
                if (data && data.username) {
                    setUser(data.username);
                }
            }
            setLoading(false);
        }
        loadUserFromCookies();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const { data } = await axios.post('/api/auth/login', { username, password }); // ???
            const { token, roles } = data;
            if (token) {
                Cookies.set('token', token, { expires: 1 }); // expires in 1 day
                axios.defaults.headers.Authorization = `Bearer ${token}`;
                setUser({ username, roles });
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        delete axios.defaults.headers.Authorization;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, loading }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;