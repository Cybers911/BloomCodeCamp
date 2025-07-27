// src/components/DeleteAssignmentModal.jsx
import React, { useState } from 'react';
import api from '../services/api';

const DeleteAssignmentModal = ({ isOpen, onClose, onSuccess, assignmentId, assignmentNumber }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setIsLoading(true);
        setError('');

        try {
            await api.delete(`/assignments/${assignmentId}`);
            onSuccess();
            handleClose();
        } catch (error) {
            console.error('Error deleting assignment:', error);
            if (error.response?.data && typeof error.response.data === 'string') {
                setError(error.response.data);
            } else {
                setError('Failed to delete assignment. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setError('');
        setIsLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title text-danger">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            Delete Assignment
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={handleClose}
                            disabled={isLoading}
                        ></button>
                    </div>
                    
                    <div className="modal-body text-center">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="mb-4">
                            <i className="bi bi-trash display-1 text-danger mb-3"></i>
                            <h4 className="text-danger mb-3">Are you sure?</h4>
                            <p className="text-muted mb-0">
                                You are about to delete assignment <strong>#{assignmentNumber}</strong>.
                            </p>
                            <p className="text-muted mb-0">
                                This action cannot be undone.
                            </p>
                        </div>

                        <div className="alert alert-warning" role="alert">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            <strong>Warning:</strong> This will permanently delete the assignment and all associated data.
                        </div>
                    </div>
                    
                    <div className="modal-footer border-0">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-trash me-2"></i>
                                    Delete Assignment
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAssignmentModal; 