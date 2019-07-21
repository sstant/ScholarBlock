import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from 'drizzle-react';

const ApplyForm = ({ scholarshipId, user }) => {

    const [applied, setApplied] = useState(false);

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    
    const { send, TXObjects } = useCacheSend('Applicants', 'create');

    const submitApplication = ev => {
        ev.preventDefault();
        const userId = user.id;
        send(userId, scholarshipId, (new Date().getTime() / 1000));
    };

    useEffect(() => {
        if (TXObjects && TXObjects.length > 0 && TXObjects[TXObjects.length - 1] && TXObjects[TXObjects.length - 1].status === 'success') setApplied(true);
    }, [TXObjects])

    return applied ? (
        <div className="card">
            <div className="card-header">
                Application Sent
            </div>
            <div className="card-body text-center">
                <p className="margin-bottom">You've submitted your application for this scholarship. Sit back and relax!</p>
            </div>
        </div>
    )  : (
        <div className="card">
            <div className="card-header">
                Apply for Scholarship
            </div>
            <div className="card-body">
                <p>You can apply to this scholarship with the following information:</p>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p className="mb-0"><strong>Email Address:</strong> {user.email}</p>
            </div>
            <div className="card-footer">
                <button onClick={submitApplication} className="btn btn-success btn-block" type="submit">Submit Application</button>
            </div>
        </div>
    )

}

export default ApplyForm;