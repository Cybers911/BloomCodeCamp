// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { register } = useAuth();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            const success = await register(credentials);
            if (success) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
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
                                <h2 className="text-primary fw-bold mb-2">Create Account</h2>
                                <p className="text-muted">Sign up for a new account</p>
                            </div>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}
                            
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fw-semibold">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Choose a username"
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
                                        placeholder="Choose a password"
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
                                            Creating account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>
                            
                            <div className="text-center mt-4">
                                <small className="text-muted">
                                    Already have an account? <a href="/login" className="text-decoration-none">Sign in</a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register; 