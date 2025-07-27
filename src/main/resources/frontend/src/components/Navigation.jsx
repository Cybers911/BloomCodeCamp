// src/components/Navigation.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navigation = ({ title = "Assignment Review App" }) => {
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container-fluid">
                <div className="navbar-brand fw-bold fs-4">
                    {title}
                </div>
                
                <div className="navbar-nav ms-auto">
                    <div className="nav-item dropdown">
                        <a 
                            className="nav-link dropdown-toggle d-flex align-items-center" 
                            href="#" 
                            role="button" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            <i className="bi bi-person-circle me-2"></i>
                            {user?.username || 'User'}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 