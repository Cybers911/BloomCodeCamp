// src/pages/PublicPage.jsx
import React from 'react';

const PublicPage = () => {
    const handleLearnerLogin = () => {
        window.location.href = '/login';
    };

    const handleReviewerLogin = () => {
        window.location.href = '/login';
    };

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-6 text-center">
                        <div className="mb-5">
                            <h1 className="display-4 fw-bold text-white mb-4">
                                Welcome to the Assignment Review App
                            </h1>
                            <p className="lead text-white-50 mb-5">
                                Streamline your assignment review process with our comprehensive platform
                            </p>
                        </div>
                        
                        <div className="row g-4 justify-content-center">
                            <div className="col-md-6">
                                <button 
                                    className="btn btn-light btn-lg w-100 py-4 shadow"
                                    onClick={handleLearnerLogin}
                                >
                                    <div className="d-flex align-items-center justify-content-center">
                                        <i className="bi bi-person-fill me-3 fs-4"></i>
                                        <div className="text-start">
                                            <div className="fw-bold">Learners Login</div>
                                            <small className="text-muted">Submit and track assignments</small>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            
                            <div className="col-md-6">
                                <button 
                                    className="btn btn-outline-light btn-lg w-100 py-4 shadow"
                                    onClick={handleReviewerLogin}
                                >
                                    <div className="d-flex align-items-center justify-content-center">
                                        <i className="bi bi-shield-check me-3 fs-4"></i>
                                        <div className="text-start">
                                            <div className="fw-bold">Reviewer Login</div>
                                            <small className="text-muted">Review and provide feedback</small>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-5">
                            <p className="text-white-50 mb-0">
                                New user? <a href="/register" className="text-white text-decoration-underline">Sign up here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicPage; 