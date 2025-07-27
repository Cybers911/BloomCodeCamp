// src/components/pages/LearnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import CreateAssignmentModal from '../components/CreateAssignmentModal';
import UpdateAssignmentModal from '../components/UpdateAssignmentModal';
import DeleteAssignmentModal from '../components/DeleteAssignmentModal';
import api from '../services/api';

const LearnerDashboard = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
    const [selectedAssignmentNumber, setSelectedAssignmentNumber] = useState(null);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/assignments');
            setAssignments(response.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Failed to load assignments');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateAssignment = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
    };

    const handleAssignmentCreated = () => {
        fetchAssignments(); // Refresh the assignments list
    };

    const handleEditAssignment = (id) => {
        setSelectedAssignmentId(id);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
        setSelectedAssignmentId(null);
    };

    const handleAssignmentUpdated = () => {
        fetchAssignments(); // Refresh the assignments list
    };

    const handleDeleteAssignment = (id, number) => {
        setSelectedAssignmentId(id);
        setSelectedAssignmentNumber(number);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setSelectedAssignmentId(null);
        setSelectedAssignmentNumber(null);
    };

    const handleAssignmentDeleted = () => {
        fetchAssignments(); // Refresh the assignments list
    };

    const handleViewAssignment = (id) => {
        window.location.href = `/view-assignment/${id}`;
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            'pending': 'badge bg-warning',
            'submitted': 'badge bg-info',
            'reviewed': 'badge bg-success',
            'rejected': 'badge bg-danger'
        };
        return <span className={statusClasses[status] || 'badge bg-secondary'}>{status}</span>;
    };

    const formatGithubUrl = (url) => {
        if (!url) return 'N/A';
        // Extract repository name from GitHub URL
        const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
        return match ? match[1] : url;
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
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h1 className="h2 mb-1">My Assignments</h1>
                                <p className="text-muted mb-0">Manage your assignments and track their status</p>
                            </div>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={handleCreateAssignment}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Create Assignment
                            </button>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        {/* Assignments Table */}
                        <div className="card shadow-sm">
                            <div className="card-body p-0">
                                {isLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-3 text-muted">Loading assignments...</p>
                                    </div>
                                ) : assignments.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="bi bi-file-earmark-text display-1 text-muted"></i>
                                        <h4 className="mt-3 text-muted">No assignments yet</h4>
                                        <p className="text-muted">Create your first assignment to get started</p>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={handleCreateAssignment}
                                        >
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Create Assignment
                                        </button>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="border-0 px-4 py-3">Number</th>
                                                    <th className="border-0 px-4 py-3">Branch</th>
                                                    <th className="border-0 px-4 py-3">GitHub Repository</th>
                                                    <th className="border-0 px-4 py-3">Status</th>
                                                    <th className="border-0 px-4 py-3 text-end">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assignments.map((assignment) => (
                                                    <tr key={assignment.id}>
                                                        <td className="px-4 py-3">
                                                            <div className="fw-semibold">#{assignment.number}</div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="text-muted">
                                                                <i className="bi bi-git me-1"></i>
                                                                {assignment.branch || 'N/A'}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="text-muted">
                                                                {assignment.github_url ? (
                                                                    <a 
                                                                        href={assignment.github_url} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="text-decoration-none"
                                                                    >
                                                                        <i className="bi bi-github me-1"></i>
                                                                        {formatGithubUrl(assignment.github_url)}
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-muted">N/A</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {getStatusBadge(assignment.status)}
                                                        </td>
                                                        <td className="px-4 py-3 text-end">
                                                            <div className="btn-group" role="group">
                                                                <button 
                                                                    className="btn btn-outline-primary btn-sm"
                                                                    onClick={() => handleViewAssignment(assignment.id)}
                                                                    title="View"
                                                                >
                                                                    <i className="bi bi-eye"></i>
                                                                </button>
                                                                <button 
                                                                    className="btn btn-outline-secondary btn-sm"
                                                                    onClick={() => handleEditAssignment(assignment.id)}
                                                                    title="Edit"
                                                                >
                                                                    <i className="bi bi-pencil"></i>
                                                                </button>
                                                                <button 
                                                                    className="btn btn-outline-danger btn-sm"
                                                                    onClick={() => handleDeleteAssignment(assignment.id, assignment.number)}
                                                                    title="Delete"
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
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
            </div>

            {/* Create Assignment Modal */}
            <CreateAssignmentModal 
                isOpen={isCreateModalOpen}
                onClose={handleCreateModalClose}
                onSuccess={handleAssignmentCreated}
            />

            {/* Update Assignment Modal */}
            <UpdateAssignmentModal 
                isOpen={isUpdateModalOpen}
                onClose={handleUpdateModalClose}
                onSuccess={handleAssignmentUpdated}
                assignmentId={selectedAssignmentId}
            />

            {/* Delete Assignment Modal */}
            <DeleteAssignmentModal 
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                onSuccess={handleAssignmentDeleted}
                assignmentId={selectedAssignmentId}
                assignmentNumber={selectedAssignmentNumber}
            />
        </div>
    );
};

export default LearnerDashboard;