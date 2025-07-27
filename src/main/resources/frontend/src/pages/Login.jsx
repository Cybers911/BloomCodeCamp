// src/components/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const success = await login(credentials);
            if (success) {
                window.location.href = '/learner-dashboard';
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="text-primary fw-bold mb-2">Welcome Back</h2>
                                <p className="text-muted">Sign in to your account</p>
                            </div>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fw-semibold">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your username"
                                        value={credentials.username}
                                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your password"
                                        value={credentials.password}
                                        onChange={(e) =>
                                            setCredentials({ ...credentials, password: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>
                            </form>
                            
                            <div className="text-center mt-4">
                                <small className="text-muted">
                                    Don't have an account? <a href="/register" className="text-decoration-none">Sign up</a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;