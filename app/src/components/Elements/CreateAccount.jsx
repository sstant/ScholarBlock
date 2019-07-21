import React, { useState } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { AddressFooter } from './';

const CreateAccount = ({ account }) => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send } = useCacheSend('Users', 'create');

    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');
    const [organization, updateOrganization] = useState('');
    const [race, updateRace] = useState('');
    const [gender, updateGender] = useState('');
    const [level, updateLevel] =  useState(null);

    const register = ev => {
        ev.preventDefault();
        send(firstName, lastName, email, level, organization);
    };

    return (
        <div className="card">
            <div className="card-header">Create an Account</div>
            <div className="card-body">
                {
                    level ? (
                        <form onSubmit={register}>
                                    
                            <div className="form-group">
                                <input type="text" placeholder="First Name" value={firstName} onChange={ev => updateFirstName(ev.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Last Name" value={lastName} onChange={ev => updateLastName(ev.target.value)} className="form-control" />
                            </div>
                            {
                                level === 'funder' ? (
                                    <div className="form-group">
                                        <input type="text" placeholder="Organization Name" value={organization} onChange={ev => updateOrganization(ev.target.value)} className="form-control" />
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <div className="form-group">
                                            <select onChange={ev => updateGender(ev.target.value)} value={gender} className="form-control">
                                                <option value="">Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Nonbinary</option>
                                                <option>Other</option>
                                                <option>Prefer Not to Say</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <select onChange={ev => updateRace(ev.target.value)} value={race} className="form-control">
                                                <option value="">Ethnicity</option>
                                                <option>African American</option>
                                                <option>American Indian/Alaska Native</option>
                                                <option>Asian</option>
                                                <option>Asian/Pacific Islander</option>
                                                <option>Hispanic</option>
                                                <option>Mixed</option>
                                                <option>Native Hawaiian/Pacific Islander</option>
                                                <option>Prefer Not to Say</option>
                                                <option>White</option>
                                            </select>
                                        </div>
                                        
                                    </React.Fragment>
                                )
                            }
                            <div className="form-group">
                                <input type="email" placeholder="Email Address" value={email} onChange={ev => updateEmail(ev.target.value)} className="form-control" />
                            </div>
                            {
                                /*
                                <div className="form-group text-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value={level} onChange={ev => updateLevel(ev.target.checked)} id="level-student" />
                                        <label className="form-check-label" htmlFor="level-student">
                                            I'm a student looking for scholarships.
                                        </label>
                                    </div>
                                </div>
                                */
                            }
                            
                
                            <button className="btn btn-success btn-block" type="submit">Create Account</button>    
                            <button className="btn btn-link btn-block btn-sm" onClick={() => updateLevel(null)}>Go Back</button>
                
                        </form>
                    ) : (
                        <div className="row">
                            <div className="col-md-12">
                                <p>Howdy, stranger. What kind of account do you want?</p>
                                <button className="btn btn-block btn-primary" onClick={() => updateLevel('student')}>Apply for Scholarships</button>
                                <p className="mb-2 mt-2 text-center">-  or -</p>
                                <button className="btn btn-block btn-primary" onClick={() => updateLevel('funder')}>Fund Scholarships</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <AddressFooter account={account} />
        </div>
        
    )

}

export default CreateAccount;