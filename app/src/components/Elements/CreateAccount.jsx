import React, { useState } from 'react';
import { AddressFooter, CreateStudent, CreateFunder } from './';

const CreateAccount = ({ account }) => {
    const [level, updateLevel] =  useState(null);
    return (
        <div className="card">
            <div className="card-header">Create an Account</div>
            <div className="card-body">
                {
                    level === 'student' ? (
                        <CreateStudent unsetLevel={() => updateLevel(null)} />
                    ) : level === 'funder' ? (
                        <CreateFunder unsetLevel={() => updateLevel(null)} />
                    ) : (
                        <div className="row">
                            <div className="col-md-12">
                                <p className="text-center">Howdy, stranger. <br />What kind of account do you want?</p>
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