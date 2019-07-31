import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { parseError } from '../../helpers';

const CreateAccount = ({ unsetLevel }) => {
    
    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send, TXObjects } = useCacheSend('Users', 'createFunder');

    const [errorMessage, setErrorMessage] = useState('');
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');
    const [organization, updateOrganization] = useState('');
    const register = ev => {
        ev.preventDefault();
        send(firstName, lastName, email, organization);
    };

    useEffect(() => {
        if (TXObjects && TXObjects.length > 0 && TXObjects[TXObjects.length - 1] && TXObjects[TXObjects.length - 1].status === 'error') {
            setErrorMessage(parseError(TXObjects[TXObjects.length - 1].error.message));
        };
    }, [TXObjects]);

    return (
        <form onSubmit={register}>
                    
            <div className="form-group">
                <input type="text" placeholder="First Name" value={firstName} onChange={ev => updateFirstName(ev.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <input type="text" placeholder="Last Name" value={lastName} onChange={ev => updateLastName(ev.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <input type="text" placeholder="Organization Name" value={organization} onChange={ev => updateOrganization(ev.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <input type="email" placeholder="Email Address" value={email} onChange={ev => updateEmail(ev.target.value)} className="form-control" />
            </div>

            {
                    errorMessage && (
                        <div className="alert alert-danger text-center mb-2 mt-2">
                            {errorMessage}
                        </div>
                    )
                }

            <button className="btn btn-success btn-block" type="submit">Create Account</button>    
            <button className="btn btn-link btn-block btn-sm" onClick={unsetLevel}>Go Back</button>

        </form>
    )

}

export default CreateAccount;