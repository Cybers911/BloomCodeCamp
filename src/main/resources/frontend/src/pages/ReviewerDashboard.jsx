// src/components/pages/ReviewerDashboard.jsx
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import api from '../services/api';

const ReviewerDashboard = () => {
    const [readyAssignments, setReadyAssignments] = useState([]);
    const [resubmittedAssignments, setResubmittedAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            setIsLoading(true);
            const [readyResponse, resubmittedResponse] = await Promise.all([
                api.get('/assignments/ready'),
                api.get('/assignments/resubmitted')
            ]);
            setReadyAssignments(readyResponse.data);
            setResubmittedAssignments(resubmittedResponse.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Failed to load assignments');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAssignmentDetails = async (id) => {
        try {
            setIsLoadingDetails(true);
            const response = await api.get(`/assignments/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching assignment details:', error);
            throw error;
        } finally {
            setIsLoadingDetails(false);
        }
    };

    const claimAssignment = async (id) => {
        try {
            await api.post(`/assignments/claim/${id}`);
            fetchAssignments(); // Refresh the data
        } catch (error) {
            console.error('Error claiming assignment:', error);
            alert('Failed to claim assignment');
        }
    };

    const reclaimAssignment = async (id) => {
        try {
            await api.post(`/assignments/reclaim/${id}`);
            fetchAssignments(); // Refresh the data
        } catch (error) {
            console.error('Error reclaiming assignment:', error);
            alert('Failed to reclaim assignment');
        }
    };

    const handleViewDetails = async (assignment) => {
        try {
            // Load fresh data from database
            const freshAssignmentData = await fetchAssignmentDetails(assignment.id);
            setSelectedAssignment(freshAssignmentData);
            setShowModal(true);
        } catch (error) {
            console.error('Error loading assignment details:', error);
            alert('Failed to load assignment details. Please try again.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAssignment(null);
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Top Navigation Bar */}
            <Navigation />

            {/* Main Content */}
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        {/* Header Section */}
                        <div className="mb-4">
                            <h1 className="h2 mb-1">Reviewer Dashboard</h1>
                            <p className="text-muted mb-0">Review and manage assignments</p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        {isLoading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading assignments...</p>
                            </div>
                        ) : (
                            <div className="row">
                                {/* Ready for Review Section */}
                                <div className="col-lg-6 mb-4">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-header bg-primary text-white">
                                            <h5 className="mb-0">
                                                <i className="bi bi-clock me-2"></i>
                                                Ready for Review
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            {readyAssignments.length === 0 ? (
                                                <div className="text-center py-4">
                                                    <i className="bi bi-check-circle display-4 text-muted"></i>
                                                    <p className="mt-3 text-muted">No assignments ready for review</p>
                                                </div>
                                            ) : (
                                                <div className="table-responsive">
                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Number</th>
                                                                <th>Status</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {readyAssignments.map((assignment) => (
                                                                <tr key={assignment.id} style={{ cursor: 'pointer' }} onClick={() => handleViewDetails(assignment)}>
                                                                    <td>{assignment.id}</td>
                                                                    <td>{assignment.number}</td>
                                                                    <td>
                                                                        <span className="badge bg-primary">Ready</span>
                                                                    </td>
                                                                    <td>
                                                                        <button 
                                                                            className="btn btn-primary btn-sm"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                claimAssignment(assignment.id);
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-hand-index me-1"></i>
                                                                            Claim
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Resubmitted Assignments Section */}
                                <div className="col-lg-6 mb-4">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-header bg-warning text-dark">
                                            <h5 className="mb-0">
                                                <i className="bi bi-arrow-clockwise me-2"></i>
                                                Resubmitted Assignments
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            {resubmittedAssignments.length === 0 ? (
                                                <div className="text-center py-4">
                                                    <i className="bi bi-check-circle display-4 text-muted"></i>
                                                    <p className="mt-3 text-muted">No resubmitted assignments</p>
                                                </div>
                                            ) : (
                                                <div className="table-responsive">
                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Number</th>
                                                                <th>Status</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {resubmittedAssignments.map((assignment) => (
                                                                <tr key={assignment.id} style={{ cursor: 'pointer' }} onClick={() => handleViewDetails(assignment)}>
                                                                    <td>{assignment.id}</td>
                                                                    <td>{assignment.number}</td>
                                                                    <td>
                                                                        <span className="badge bg-warning text-dark">Resubmitted</span>
                                                                    </td>
                                                                    <td>
                                                                        <button 
                                                                            className="btn btn-warning btn-sm"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                reclaimAssignment(assignment.id);
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-arrow-clockwise me-1"></i>
                                                                            Reclaim
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Assignment Details Modal */}
            {showModal && selectedAssignment && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="bi bi-file-text me-2"></i>
                                    Assignment Details
                                    {isLoadingDetails && (
                                        <small className="ms-2 text-muted">
                                            <i className="bi bi-arrow-clockwise spin"></i> Loading fresh data...
                                        </small>
                                    )}
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                {isLoadingDetails ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-3 text-muted">Loading assignment details...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="fw-bold">Basic Information</h6>
                                                <table className="table table-borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td className="fw-semibold">ID:</td>
                                                            <td>{selectedAssignment.id}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-semibold">Number:</td>
                                                            <td>{selectedAssignment.number}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-semibold">Title:</td>
                                                            <td>{selectedAssignment.title}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-semibold">Status:</td>
                                                            <td>
                                                                <span className={`badge ${selectedAssignment.status === 'ready' ? 'bg-primary' : 'bg-warning text-dark'}`}>
                                                                    {selectedAssignment.status === 'ready' ? 'Ready' : 'Resubmitted'}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        {selectedAssignment.createdAt && (
                                                            <tr>
                                                                <td className="fw-semibold">Created:</td>
                                                                <td>{new Date(selectedAssignment.createdAt).toLocaleDateString()}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="fw-bold">Description</h6>
                                                <div className="border rounded p-3 bg-light">
                                                    <p className="mb-0">
                                                        {selectedAssignment.description || 'No description available'}
                                                    </p>
                                                </div>
                                                
                                                {selectedAssignment.requirements && (
                                                    <>
                                                        <h6 className="fw-bold mt-3">Requirements</h6>
                                                        <div className="border rounded p-3 bg-light">
                                                            <p className="mb-0">
                                                                {selectedAssignment.requirements}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {selectedAssignment.submission && (
                                            <div className="mt-4">
                                                <h6 className="fw-bold">Submission Details</h6>
                                                <div className="border rounded p-3 bg-light">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p className="mb-1"><strong>Submitted by:</strong> {selectedAssignment.submission.submittedBy || 'Unknown'}</p>
                                                            <p className="mb-1"><strong>Submitted on:</strong> {selectedAssignment.submission.submittedAt ? new Date(selectedAssignment.submission.submittedAt).toLocaleString() : 'Unknown'}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="mb-1"><strong>File:</strong> {selectedAssignment.submission.fileName || 'No file'}</p>
                                                            {selectedAssignment.submission.comments && (
                                                                <p className="mb-0"><strong>Comments:</strong> {selectedAssignment.submission.comments}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                {!isLoadingDetails && (
                                    <button 
                                        type="button" 
                                        className={`btn ${selectedAssignment.status === 'ready' ? 'btn-primary' : 'btn-warning'}`}
                                        onClick={() => {
                                            if (selectedAssignment.status === 'ready') {
                                                claimAssignment(selectedAssignment.id);
                                            } else {
                                                reclaimAssignment(selectedAssignment.id);
                                            }
                                            closeModal();
                                        }}
                                    >
                                        {selectedAssignment.status === 'ready' ? (
                                            <>
                                                <i className="bi bi-hand-index me-1"></i>
                                                Claim Assignment
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-arrow-clockwise me-1"></i>
                                                Reclaim Assignment
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Backdrop */}
            {showModal && (
                <div className="modal-backdrop fade show"></div>
            )}
        </div>
    );
};

export default ReviewerDashboard;