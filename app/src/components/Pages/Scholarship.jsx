import React, { useState } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { OwnerAlert } from '../Elements';
import web3 from 'web3';

const Scholarship = props => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { apply, TXObjects } = useCacheSend('Applicants', 'apply');

    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');

    const { id } = props.match.params;

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const scholarship = useCacheCall('Scholarships', 'scholarships', id);

    const submitApplication = ev => {
        ev.preventDefault();
        apply(id, firstName, lastName, email);
    };
    
    return scholarship ? (
        <div className="container">
            <OwnerAlert owner={scholarship.owner} />
            <div className="row">
                <div className="col-md-8">
                    <h6>Scholarship</h6>
                    <h1>{scholarship.name}</h1>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Apply for Scholarship
                        </div>
                        <div className="card-body">
                            <form onClick={submitApplication}>
                                
                                <div className="form-group">
                                    <input type="text" placeholder="First Name" value={firstName} onChange={ev => updateFirstName(ev.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Last Name" value={lastName} onChange={ev => updateLastName(ev.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Email Address" value={email} onChange={ev => updateEmail(ev.target.value)} className="form-control" />
                                </div>

                                <button className="btn btn-success btn-block" type="submit">Submit Application</button>    

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (<h4>Loading scholarship...</h4>)

};

export default Scholarship;