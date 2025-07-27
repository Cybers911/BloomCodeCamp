// src/components/UpdateAssignmentModal.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UpdateAssignmentModal = ({ isOpen, onClose, onSuccess, assignmentId }) => {
    const [formData, setFormData] = useState({
        number: '',
        branch: '',
        githubUrl: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    // Fetch assignment data when modal opens
    useEffect(() => {
        if (isOpen && assignmentId) {
            fetchAssignmentData();
        }
    }, [isOpen, assignmentId]);

    const fetchAssignmentData = async () => {
        try {
            setIsFetching(true);
            const response = await api.get(`/assignments/${assignmentId}`);
            const assignment = response.data;
            setFormData({
                number: assignment.number || '',
                branch: assignment.branch || '',
                githubUrl: assignment.githubUrl || ''
            });
        } catch (error) {
            console.error('Error fetching assignment:', error);
            setError('Failed to load assignment data');
        } finally {
            setIsFetching(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.put(`/assignments/${assignmentId}`, formData);
            if (response.data) {
                onSuccess();
                handleClose();
            }
        } catch (error) {
            console.error('Error updating assignment:', error);
            if (error.response?.data && typeof error.response.data === 'string') {
                setError(error.response.data);
            } else {
                setError('Failed to update assignment. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({ number: '', branch: '', githubUrl: '' });
        setError('');
        setIsLoading(false);
        setIsFetching(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="bi bi-pencil-square me-2"></i>
                            Update Assignment
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={handleClose}
                            disabled={isLoading || isFetching}
                        ></button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {isFetching ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-3 text-muted">Loading assignment data...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="number" className="form-label fw-semibold">
                                            Assignment Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            id="number"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleInputChange}
                                            placeholder="Enter assignment number"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="githubUrl" className="form-label fw-semibold">
                                            GitHub Repository URL <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            className="form-control form-control-lg"
                                            id="githubUrl"
                                            name="githubUrl"
                                            value={formData.githubUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://github.com/username/repository"
                                            required
                                            disabled={isLoading}
                                        />
                                        <div className="form-text">
                                            <i className="bi bi-github me-1"></i>
                                            Enter the full URL to your GitHub repository
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="branch" className="form-label fw-semibold">
                                            Git Branch <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="branch"
                                            name="branch"
                                            value={formData.branch}
                                            onChange={handleInputChange}
                                            placeholder="e.g., main, develop, feature/assignment-1"
                                            required
                                            disabled={isLoading}
                                        />
                                        <div className="form-text">
                                            <i className="bi bi-git me-1"></i>
                                            Enter the branch name where your assignment code is located
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={handleClose}
                                disabled={isLoading || isFetching}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isLoading || isFetching}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Update Assignment
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateAssignmentModal; 