import React, { useState } from 'react';
import { drizzleReactHooks } from 'drizzle-react';

const CreateStudent = ({ unsetLevel }) => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send } = useCacheSend('Users', 'createStudent');

    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');
    const [race, updateRace] = useState('');
    const [gender, updateGender] = useState('');

    const register = ev => {
        ev.preventDefault();
        send(firstName, lastName, email);
    };

    return (
        <form onSubmit={register}>
                                
            <div className="form-group">
                <input type="text" placeholder="First Name" value={firstName} onChange={ev => updateFirstName(ev.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <input type="text" placeholder="Last Name" value={lastName} onChange={ev => updateLastName(ev.target.value)} className="form-control" />
            </div>
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
            <div className="form-group">
                <input type="email" placeholder="Email Address" value={email} onChange={ev => updateEmail(ev.target.value)} className="form-control" />
            </div>
                            
            <button className="btn btn-success btn-block" type="submit">Create Account</button>    
            <button className="btn btn-link btn-block btn-sm" onClick={unsetLevel}>Go Back</button>

        </form>
    )

}

export default CreateStudent;