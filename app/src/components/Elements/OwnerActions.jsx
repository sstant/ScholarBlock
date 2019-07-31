import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';


const OwnerActions = ({ scholarship }) => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();

    const { send } = useCacheSend('Scholarships', 'disableScholarship');

    const disableScholarship = () => {
        if (window.confirm("Are you sure you want to deactivate this scholarship?")) {
            send(scholarship.id);
        };
    }

    return (
        <div className="card">
            <div className="card-header">Owner Actions</div>
            <div className="card-body text-center">
                <p className="mb-0">Your scholarship is currently { scholarship.active ? 'live and accepting applicants' : 'inactive'}.</p>
            </div>
            {
                scholarship.active && (
                    <div className="card-footer">
                        <button className="btn btn-danger btn-block btn-sm" onClick={disableScholarship}>Deactivate Scholarship</button>
                    </div>
                )
            }
        </div>
    )
}

export default OwnerActions;