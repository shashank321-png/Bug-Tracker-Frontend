import React from 'react';

const BugDetail = ({ bug }) => {
    if (!bug) {
        return <div>No bug details available.</div>;
    }

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{bug.bugTitle}</h2>
            <p className="mt-2"><strong>Description:</strong> {bug.bugDescription}</p>
            <p className="mt-2"><strong>Status:</strong> {bug.status}</p>
            <p className="mt-2"><strong>Priority:</strong> {bug.priority}</p>
            <p className="mt-2"><strong>Project ID:</strong> {bug.projectID}</p>
            <p className="mt-2"><strong>Assigned To:</strong> {bug.assignedTo}</p>
            <p className="mt-2"><strong>Created At:</strong> {new Date(bug.startDate).toLocaleDateString()}</p>
            <p className="mt-2"><strong>Updated At:</strong> {new Date(bug.endDate).toLocaleDateString()}</p>
        </div>
    );
};

export default BugDetail;