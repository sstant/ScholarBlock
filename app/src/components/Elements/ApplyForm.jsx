import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { parseError } from '../../helpers';

const ApplyForm = ({ scholarshipId, user }) => {

    const [errorMessage, setErrorMessage] = useState('');

    const { useCacheSend, useCacheCall } = drizzleReactHooks.useDrizzle();

    const hasApplied = useCacheCall('Applicants', 'hasApplied', user.id, scholarshipId);
    const { send, TXObjects } = useCacheSend('Applicants', 'create');

    const submitApplication = ev => {
        ev.preventDefault();
        send(scholarshipId);
    };

    useEffect(() => {
        if (TXObjects && TXObjects.length > 0 && TXObjects[TXObjects.length - 1] && TXObjects[TXObjects.length - 1].status === 'error') {
            setErrorMessage(parseError(TXObjects[TXObjects.length - 1].error.message));
        };
    }, [TXObjects]);

    return hasApplied ? (
        <div className="card">
            <div className="card-header">
                Application Sent
            </div>
            <div className="card-body text-center">
                <p className="mb-0">You've submitted your application for this scholarship. Sit back and relax!</p>
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
                {
                    errorMessage && (
                        <div className="alert alert-danger text-center mb-0 mt-2">
                            {errorMessage}
                        </div>
                    )
                }
            </div>
            <div className="card-footer">
                <button onClick={submitApplication} className="btn btn-success btn-block" type="submit">Submit Application</button>
            </div>
        </div>
    )

}

export default ApplyForm;