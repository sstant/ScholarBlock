import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { parseError } from '../../helpers';
import web3 from 'web3';

const ApplyForm = ({ scholarship, user }) => {

    const [errorMessage, setErrorMessage] = useState('');

    const { useCacheSend, useCacheCall } = drizzleReactHooks.useDrizzle();

    const hasApplied = useCacheCall('Scholarships', 'hasApplied', user.id, scholarship.id);
    const { send, TXObjects } = useCacheSend('Scholarships', 'applyForScholarship', scholarship.id);

    const submitApplication = ev => {
        ev.preventDefault();
        send(scholarship.id);
        // necessary arg?
    };

    useEffect(() => {
        if (TXObjects && TXObjects.length > 0 && TXObjects[TXObjects.length - 1] && TXObjects[TXObjects.length - 1].status === 'error') {
            setErrorMessage(parseError(TXObjects[TXObjects.length - 1].error.message));
        };
    }, [TXObjects]);

    return scholarship.winner === user.id ? (
        <div className="card">
            <div className="card-header">
                You've been selected!
            </div>
            <div className="card-body text-center">
                <p><strong>Congratulations {user.firstName}!</strong></p>
                <p>You've been selected for this scholarship.</p> 
                <p><small>You should have recieved {web3.utils.fromWei(scholarship.amount)} in ETH sent to your wallet: {user.wallet}</small></p>
            </div>
        </div>
    ) : hasApplied ? (
        <div className="card">
            <div className="card-header">
                Application Sent
            </div>
            <div className="card-body text-center">
                <p className="mb-0">You've submitted your application for this scholarship. Sit back and relax!</p>
            </div>
        </div>
    ) : scholarship.active ? (
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
    ) : (
        <div className="card">
            <div className="card-header">
                Inactive Scholarship
            </div>
            <div className="card-body text-center">
                <p className="mb-0">This scholarship is inactive, and no longer accepting applicants.</p>
            </div>
        </div>
    )

}

export default ApplyForm;