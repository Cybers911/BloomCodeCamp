// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(undefined, undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        try {
            const response = await api.post('/api/auth/login', credentials);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setUser({ username: credentials.username });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return {
        login: async (credentials) => {
            try {
                const response = await api.post('/auth/login', credentials);
                const token = response.data.token;
                localStorage.setItem('token', token);
                // You can't set user state here unless you use a global state or context!
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    };
};
