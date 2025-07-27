// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(undefined, undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            
            // Check if response is JSON (success case)
            if (response.headers['content-type']?.includes('application/json')) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setUser({ username: credentials.username });
                return true;
            } else {
                // Handle string error response
                console.error('Login failed:', response.data);
                return false;
            }
        } catch (error) {
            // Handle string error response from catch block
            if (error.response?.data && typeof error.response.data === 'string') {
                console.error('Login failed:', error.response.data);
            } else {
                console.error('Login failed:', error);
            }
            return false;
        }
    };

    const register = async (credentials) => {
        try {
            const response = await api.post('/auth/register', credentials);
            
            // Register always returns a string (success or error)
            if (typeof response.data === 'string') {
                if (response.data.toLowerCase().includes('success') || response.data.toLowerCase().includes('created')) {
                    return true;
                } else {
                    console.error('Registration failed:', response.data);
                    return false;
                }
            }
            return false;
        } catch (error) {
            // Handle string error response
            if (error.response?.data && typeof error.response.data === 'string') {
                console.error('Registration failed:', error.response.data);
            } else {
                console.error('Registration failed:', error);
            }
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
