import React, { useState, useCallback } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import web3 from 'web3';

const CreateScholarship = props => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send, TXObjects } = useCacheSend('Scholarships', 'create');

    const [name, updateName] = useState('');
    const [amount, updateAmount] = useState('');
    const [description, updateDescription] = useState('');

    const create = ev => {
        ev.preventDefault();
        console.log(name);
        var value = web3.utils.toWei(amount,'ether');
        send(name, description, { value });
    };

    console.log('RENDERING');

    return (
        <div className="card mt-4">
        <div className="card-header">
            Create a Scholarship
        </div>
        <div className="card-body">
            <form onSubmit={create}>
                <div className="form-group">
                    <input className="form-control" value={name} onChange={ev => updateName(ev.target.value)} placeholder="Scholarship Name" />
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <input type="number" className="form-control" placeholder="0.01" value={amount} onChange={ev => updateAmount(ev.target.value)} />
                        <div className="input-group-append">
                            <span className="input-group-text">ETH</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <textarea className="form-control" value={description} onChange={ev => updateDescription(ev.target.value)} placeholder="Enter some more information about this scholarship..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Scholarship</button>
            </form>
        </div>
        </div>
    )

}

export default CreateScholarship;