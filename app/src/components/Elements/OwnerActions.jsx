import React from 'react';

const OwnerActions = ({ scholarship }) => (
    <div className="card">
        <div className="card-header">Owner Actions</div>
        <div className="card-body text-center">
            <p className="mb-0">Your scholarship is currently { scholarship.active ? 'live and accepting applicants' : 'inactive'}.</p>
        </div>
        {
            scholarship.active && (
                <div className="card-footer">
                    <button className="btn btn-danger btn-block btn-sm" onClick={() => alert('Are you sure you want to deactivate this scholarship?')}>Deactivate Scholarship</button>
                </div>
            )
        }
    </div>
)

export default OwnerActions;