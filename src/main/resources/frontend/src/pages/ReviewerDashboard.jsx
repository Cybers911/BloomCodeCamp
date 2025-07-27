// src/components/pages/ReviewerDashboard.jsx
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import api from '../services/api';

const ReviewerDashboard = () => {
    const [readyAssignments, setReadyAssignments] = useState([]);
    const [resubmittedAssignments, setResubmittedAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

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
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {readyAssignments.map((assignment) => (
                                                                <tr key={assignment.id}>
                                                                    <td>{assignment.id}</td>
                                                                    <td>{assignment.number}</td>
                                                                    <td>
                                                                        <span className="badge bg-primary">Ready</span>
                                                                    </td>
                                                                    <td>
                                                                        <button 
                                                                            className="btn btn-primary btn-sm"
                                                                            onClick={() => claimAssignment(assignment.id)}
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
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {resubmittedAssignments.map((assignment) => (
                                                                <tr key={assignment.id}>
                                                                    <td>{assignment.id}</td>
                                                                    <td>{assignment.number}</td>
                                                                    <td>
                                                                        <span className="badge bg-warning text-dark">Resubmitted</span>
                                                                    </td>
                                                                    <td>
                                                                        <button 
                                                                            className="btn btn-warning btn-sm"
                                                                            onClick={() => reclaimAssignment(assignment.id)}
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
        </div>
    );
};

export default ReviewerDashboard;