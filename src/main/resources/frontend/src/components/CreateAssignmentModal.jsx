// src/components/CreateAssignmentModal.jsx
import React, { useState } from 'react';
import api from '../services/api';

const CreateAssignmentModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        number: '',
        branch: '',
        githubUrl: '',
        status: 'READY'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
            const response = await api.post('/assignments', formData);
            if (response.data) {
                onSuccess();
                handleClose();
            }
        } catch (error) {
            console.error('Error creating assignment:', error);
            if (error.response?.data && typeof error.response.data === 'string') {
                setError(error.response.data);
            } else {
                setError('Failed to create assignment. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({ number: '', branch: '', githubUrl: '', status: 'READY' });
        setError('');
        setIsLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="bi bi-plus-circle me-2"></i>
                            Create New Assignment
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={handleClose}
                            disabled={isLoading}
                        ></button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
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
                            
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label fw-semibold">
                                    Status <span className="text-danger">*</span>
                                </label>
                                <select
                                    className="form-select form-select-lg"
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                >
                                    <option value="READY">Ready</option>
                                    <option value="RESUBMITTED">Resubmitted</option>
                                    <option value="CLAIMED">Claimed</option>
                                </select>
                                <div className="form-text">
                                    <i className="bi bi-info-circle me-1"></i>
                                    Select the current status of your assignment
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Create Assignment
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

export default CreateAssignmentModal; 