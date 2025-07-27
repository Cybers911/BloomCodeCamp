import React from 'react';

const ViewAssignmentModal = ({ 
    showModal, 
    selectedAssignment, 
    isLoadingDetails, 
    onClose, 
    onClaim, 
    onReclaim 
}) => {
    if (!showModal || !selectedAssignment) {
        return null;
    }

    return (
        <>
            {/* Assignment Details Modal */}
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
                                onClick={onClose}
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
                                                        <td className="fw-semibold">Status:</td>
                                                        <td>
                                                            <span className={`badge ${
                                                                selectedAssignment.status === 'READY' ? 'bg-primary' : 
                                                                selectedAssignment.status === 'RESUBMITTED' ? 'bg-warning text-dark' : 
                                                                selectedAssignment.status === 'CLAIMED' ? 'bg-success' : 'bg-secondary'
                                                            }`}>
                                                                {selectedAssignment.status === 'READY' ? 'Ready' : 
                                                                 selectedAssignment.status === 'RESUBMITTED' ? 'Resubmitted' : 
                                                                 selectedAssignment.status === 'CLAIMED' ? 'Claimed' : 
                                                                 selectedAssignment.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="fw-semibold">Assignment by User:</td>
                                                        <td>{selectedAssignment.user?.username || 'Unknown'}</td>
                                                    </tr>
                                                    {selectedAssignment.githubUrl && (
                                                        <tr>
                                                            <td className="fw-semibold">GitHub URL:</td>
                                                            <td>
                                                                <a href={selectedAssignment.githubUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                                                    <i className="bi bi-github me-1"></i>
                                                                    View Repository
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {selectedAssignment.branch && (
                                                        <tr>
                                                            <td className="fw-semibold">Branch:</td>
                                                            <td>
                                                                <span className="badge bg-secondary">
                                                                    <i className="bi bi-git me-1"></i>
                                                                    {selectedAssignment.branch}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    
                                    
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={onClose}
                            >
                                Close
                            </button>
                            {!isLoadingDetails && selectedAssignment.status !== 'CLAIMED' && (
                                <button 
                                    type="button" 
                                    className={`btn ${selectedAssignment.status === 'READY' ? 'btn-primary' : 'btn-warning'}`}
                                    onClick={() => {
                                        if (selectedAssignment.status === 'READY') {
                                            onClaim(selectedAssignment.id);
                                        } else {
                                            onReclaim(selectedAssignment.id);
                                        }
                                        onClose();
                                    }}
                                >
                                    {selectedAssignment.status === 'READY' ? (
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

            {/* Modal Backdrop */}
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default ViewAssignmentModal; 