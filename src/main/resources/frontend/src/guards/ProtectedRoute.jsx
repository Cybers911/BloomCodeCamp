// src/guards/ProtectedRoute.jsx
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Check if user is authenticated
    if (!user) {
        // Redirect to login page using React Router
        return <Redirect to="/login" />;
    }

    // If authenticated, render the protected content
    return children;
};

export default ProtectedRoute; 