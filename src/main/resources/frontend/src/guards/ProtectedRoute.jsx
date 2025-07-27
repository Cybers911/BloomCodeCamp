// src/guards/ProtectedRoute.jsx
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    // Check if user is authenticated
    if (!user) {
        // Redirect to login page using React Router
        return <Redirect to="/login" />;
    }

    // If authenticated, render the protected content
    return children;
};

export default ProtectedRoute; 